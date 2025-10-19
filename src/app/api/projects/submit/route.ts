import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { executeQuery, executeQuerySingle } from '@/lib/database';

// 检查用户是否有管理员权限
async function checkUserAdminPermission(userId: string): Promise<boolean> {
  try {
    const result = await executeQuerySingle(
      'SELECT is_admin FROM web3_users WHERE id = ?',
      [userId]
    );
    return result ? result.is_admin === 1 : false;
  } catch (error) {
    console.error('Error checking user admin permission:', error);
    return false;
  }
}

// 数据库查询函数 - 根据slug获取分类ID
async function getCategoryIdBySlug(categorySlug: string): Promise<number | null> {
  try {
    const result = await executeQuerySingle(
      'SELECT id FROM web3_categories WHERE slug = ? AND parent_id IS NULL',
      [categorySlug]
    );
    return result ? result.id : null;
  } catch (error) {
    console.error('Error fetching category ID:', error);
    return null;
  }
}

// 数据库查询函数 - 根据slug获取子分类ID
async function getSubcategoryIdBySlug(subcategorySlug: string): Promise<number | null> {
  try {
    const result = await executeQuerySingle(
      'SELECT id FROM web3_categories WHERE slug = ? AND parent_id IS NOT NULL',
      [subcategorySlug]
    );
    return result ? result.id : null;
  } catch (error) {
    console.error('Error fetching subcategory ID:', error);
    return null;
  }
}

interface ProjectSubmissionData {
  name: string;
  description: string;
  detailedDescription: string;
  category: string;
  subcategory: string;
  url: string;
  logo: string;
  tags: string[];
  chains: string[];
  officialLinks: {
    website: string;
    whitepaper?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
    github?: string;
    medium?: string;
  };
}

// 验证URL格式
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}





// 验证提交数据
function validateSubmission(data: ProjectSubmissionData): string | null {
  // 必填字段检查
  const requiredFields = ['name', 'description', 'category', 'subcategory', 'url'];
  for (const field of requiredFields) {
    if (!data[field as keyof ProjectSubmissionData] || 
        (data[field as keyof ProjectSubmissionData] as string).trim() === '') {
      return `${field} 是必填字段`;
    }
  }

  // URL格式验证
  if (!isValidUrl(data.url)) {
    return '项目网址格式不正确';
  }

  // 验证官方链接URL格式
  const linkFields = ['website', 'whitepaper', 'twitter', 'telegram', 'discord', 'github', 'medium'];
  for (const field of linkFields) {
    const url = data.officialLinks[field as keyof typeof data.officialLinks];
    if (url && url.trim() !== '' && !isValidUrl(url)) {
      return `${field} 链接格式不正确`;
    }
  }

  // Logo URL验证
  if (data.logo && data.logo.trim() !== '' && !isValidUrl(data.logo)) {
    return 'Logo URL 格式不正确';
  }

  // 检查数组字段
  if (!data.chains || data.chains.length === 0) {
    return '请至少选择一个支持的区块链';
  }

  if (!data.tags || data.tags.length === 0) {
    return '请至少添加一个标签';
  }

  // 字符长度限制
  if (data.name.length > 100) {
    return '项目名称不能超过100个字符';
  }

  if (data.description.length > 500) {
    return '项目简介不能超过500个字符';
  }

  if (data.detailedDescription && data.detailedDescription.length > 5000) {
    return '详细描述不能超过5000个字符';
  }

  if (data.tags.length > 10) {
    return '标签数量不能超过10个';
  }

  if (data.chains.length > 15) {
    return '支持的区块链数量不能超过15个';
  }

  return null;
}



export async function POST(request: NextRequest) {
  try {
    // 获取用户会话
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: true, message: '请先登录' },
        { status: 401 }
      );
    }

    // 检查用户是否有管理员权限
    const hasAdminPermission = await checkUserAdminPermission(String(session.user.id));
    if (!hasAdminPermission) {
      return NextResponse.json(
        { error: true, message: '您没有提交项目的权限，请联系管理员' },
        { status: 403 }
      );
    }

    const data: ProjectSubmissionData = await request.json();
    
    // 验证提交数据
    const validationError = validateSubmission(data);
    if (validationError) {
      return NextResponse.json(
        { error: true, message: validationError },
        { status: 400 }
      );
    }

    // 获取分类和子分类ID
    const categoryId = await getCategoryIdBySlug(data.category);
    const subcategoryId = await getSubcategoryIdBySlug(data.subcategory);
    
    if (!categoryId || !subcategoryId) {
      return NextResponse.json(
        { error: true, message: '无效的分类或子分类' },
        { status: 400 }
      );
    }

    // 检查项目是否已存在
    const existingProject = await executeQuerySingle<{count: number}>(
      'SELECT COUNT(*) as count FROM web3_projects WHERE LOWER(name) = LOWER(?)',
      [data.name]
    );
    
    if (existingProject && existingProject.count > 0) {
      return NextResponse.json(
        { error: true, message: '项目已存在' },
        { status: 400 }
      );
    }

    // 插入项目到数据库
     const insertQuery = `
       INSERT INTO web3_projects (
         name, description, detailed_description, category, subcategory,
         url, logo, tags, chains, official_links
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     `;
    // 修改project_count
    const updateQuery = `
      UPDATE web3_categories
      SET project_count = project_count + 1
      WHERE id = ?
    `;
    await executeQuery(updateQuery, [categoryId]);
    await executeQuery(updateQuery, [subcategoryId]); 
    
    const params = [
       data.name,
       data.description,
       data.detailedDescription,
       categoryId,
       subcategoryId,
       data.url,
       data.logo,
       JSON.stringify(data.tags),
       JSON.stringify(data.chains),
       JSON.stringify(data.officialLinks)
     ];
    
    await executeQuery(insertQuery, params);

    return NextResponse.json({
      success: true,
      message: '项目添加成功！'
    });

  } catch (error) {
    console.error('项目提交错误:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: true, message: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: true, message: '服务器内部错误，请稍后重试' },
      { status: 500 }
    );
  }
}

// 获取项目列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    
    let whereConditions: string[] = [];
     let params: any[] = [];
    
    if (category) {
       const categoryId = await getCategoryIdBySlug(category);
       if (categoryId) {
         whereConditions.push('category = ?');
         params.push(categoryId);
       }
     }
     
     if (subcategory) {
       const subcategoryId = await getSubcategoryIdBySlug(subcategory);
       if (subcategoryId) {
         whereConditions.push('subcategory = ?');
         params.push(subcategoryId);
       }
     }
    
    if (search) {
      whereConditions.push('(name LIKE ? OR description LIKE ? OR tags LIKE ?)');
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
    
    // 获取总数
    const countQuery = `SELECT COUNT(*) as total FROM web3_projects ${whereClause}`;
    const countResult = await executeQuerySingle<{total: number}>(countQuery, params);
    const total = countResult?.total || 0;
    
    // 获取项目列表
     const projectsQuery = `
       SELECT 
         id, name, description, detailed_description as detailedDescription,
         category, subcategory,
         url, logo, tags, chains, official_links as officialLinks,
         created_at as createdAt, updated_at as updatedAt
       FROM web3_projects 
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?
     `;
    
    const projects = await executeQuery<any>(projectsQuery, [...params, limit, offset]);
    
    // 处理JSON字段
    const processedProjects = projects.map(project => ({
      ...project,
      tags: JSON.parse(project.tags || '[]'),
      chains: JSON.parse(project.chains || '[]'),
      officialLinks: JSON.parse(project.officialLinks || '{}')
    }));
    
    return NextResponse.json({
      success: true,
      projects: processedProjects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('获取项目列表错误:', error);
    return NextResponse.json(
      { error: true, message: '获取项目列表失败' },
      { status: 500 }
    );
  }
}