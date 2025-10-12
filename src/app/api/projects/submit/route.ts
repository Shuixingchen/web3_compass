import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQuerySingle } from '@/lib/database';

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

interface SubmittedProject extends ProjectSubmissionData {
  id: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  submitterInfo?: {
    ip: string;
    userAgent: string;
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

// 生成唯一ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 读取现有提交
async function getExistingSubmissions(): Promise<SubmittedProject[]> {
  try {
    const query = `
      SELECT 
        submission_id as id,
        name,
        description,
        detailed_description as detailedDescription,
        category,
        subcategory,
        url,
        logo,
        tags,
        chains,
        official_links as officialLinks,
        status,
        submitter_ip as ip,
        submitter_user_agent as userAgent,
        created_at as submittedAt
      FROM web3_project_submissions 
      ORDER BY created_at DESC
    `;
    
    const rows = await executeQuery<any>(query);
    
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      detailedDescription: row.detailedDescription,
      category: row.category,
      subcategory: row.subcategory,
      url: row.url,
      logo: row.logo,
      tags: JSON.parse(row.tags || '[]'),
      chains: JSON.parse(row.chains || '[]'),
      officialLinks: JSON.parse(row.officialLinks || '{}'),
      status: row.status,
      submittedAt: row.submittedAt,
      submitterInfo: {
        ip: row.ip || 'unknown',
        userAgent: row.userAgent || 'unknown'
      }
    }));
  } catch (error) {
    console.error('获取提交记录失败:', error);
    return [];
  }
}

// 保存提交
async function saveSubmission(submission: SubmittedProject): Promise<void> {
  try {
    // 检查是否已存在相同名称的项目
    const existingQuery = `
      SELECT COUNT(*) as count 
      FROM web3_project_submissions 
      WHERE LOWER(name) = LOWER(?) AND status != 'rejected'
    `;
    
    const existingResult = await executeQuerySingle<{count: number}>(existingQuery, [submission.name]);
    
    if (existingResult && existingResult.count > 0) {
      throw new Error('已存在同名项目，请检查项目名称');
    }

    // 插入新的提交记录
    const insertQuery = `
      INSERT INTO web3_project_submissions (
        submission_id, name, description, detailed_description, category, subcategory,
        url, logo, tags, chains, official_links, status, submitter_ip, submitter_user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [
      submission.id,
      submission.name,
      submission.description,
      submission.detailedDescription,
      submission.category,
      submission.subcategory,
      submission.url,
      submission.logo,
      JSON.stringify(submission.tags),
      JSON.stringify(submission.chains),
      JSON.stringify(submission.officialLinks),
      submission.status,
      submission.submitterInfo?.ip || 'unknown',
      submission.submitterInfo?.userAgent || 'unknown'
    ];
    
    await executeQuery(insertQuery, params);
  } catch (error) {
    console.error('保存提交记录失败:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ProjectSubmissionData = await request.json();
    
    // 验证提交数据
    const validationError = validateSubmission(data);
    if (validationError) {
      return NextResponse.json(
        { error: true, message: validationError },
        { status: 400 }
      );
    }

    // 创建提交记录
    const submission: SubmittedProject = {
      ...data,
      id: generateId(),
      submittedAt: new Date().toISOString(),
      status: 'pending',
      submitterInfo: {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    };

    // 保存提交
    await saveSubmission(submission);

    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: '项目提交成功！我们会在1-3个工作日内审核您的提交。',
      submissionId: submission.id
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

// 获取提交列表（管理员功能）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const submissions = await getExistingSubmissions();
    
    // 根据状态过滤
    const filteredSubmissions = status 
      ? submissions.filter(s => s.status === status)
      : submissions;
    
    // 按提交时间倒序排列
    filteredSubmissions.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    
    return NextResponse.json({
      success: true,
      submissions: filteredSubmissions,
      total: filteredSubmissions.length
    });
    
  } catch (error) {
    console.error('获取提交列表错误:', error);
    return NextResponse.json(
      { error: true, message: '获取提交列表失败' },
      { status: 500 }
    );
  }
}