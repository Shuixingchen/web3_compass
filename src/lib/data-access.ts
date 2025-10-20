import { executeQuery, executeQuerySingle } from './database';
import { Web3Project, Category, ProjectNews, Subcategory, Chain } from '@/types';

// 数据库字段到接口的映射
interface DbProject {
  id: string;
  name: string;
  description: string;
  detailed_description?: string;
  category: number;
  subcategory: number;
  url: string;
  logo?: string;
  view_count: number;
  tags?: string; // JSON字符串格式的标签数组
  chains?: string; // JSON字符串格式的区块链数组
  official_links?: string;
  created_at: string;
  updated_at: string;
}

interface DbNews {
  id: string;
  title: string;
  summary: string;
  url: string;
  source?: string;
  project_id?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface DbCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  parent_id?: string;
  sort_order: number;
  project_count: number;
}




interface DbBookmark {
  id: string;
  user_id: string;
  project_id: string;
  created_at: string;
}

interface DbChain {
  chain_symbol: string;
  chain_name: string;
  sort: number;
}

// 获取所有分类
export async function getCategories(): Promise<Category[]> {
  try {
    // 获取主分类
    const mainCategories = await executeQuery<DbCategory>(
      'SELECT * FROM web3_categories WHERE parent_id IS NULL ORDER BY sort_order'
    );

    // 获取所有子分类
    const subCategories = await executeQuery<DbCategory>(
      'SELECT * FROM web3_categories WHERE parent_id IS NOT NULL ORDER BY parent_id, sort_order'
    );

    // 组装分类数据
    const categories: Category[] = mainCategories.map(cat => {
      const subcategories: Subcategory[] = subCategories
        .filter(sub => sub.parent_id === cat.id)
        .map(sub => ({
          id: parseInt(sub.id),
          name: sub.name,
          count: sub.project_count
        }));

      return {
        id: parseInt(cat.id),
        name: cat.name,
        icon: cat.icon,
        subcategories
      };
    });

    return categories;
  } catch (error) {
    console.error('获取分类失败:', error);
    throw error;
  }
}

// 获取所有链
export async function getChains(): Promise<Chain[]> {
  try {
    const query = `
      SELECT chain_symbol, chain_name, sort
      FROM web3_chains
      ORDER BY sort ASC
    `;
    
    const dbChains = await executeQuery<DbChain>(query);
    
    return dbChains.map(chain => ({
      symbol: chain.chain_symbol,
      name: chain.chain_name,
      sort: chain.sort
    }));
  } catch (error) {
    console.error('获取链数据失败:', error);
    throw error;
  }
}

// 获取所有项目
export async function getProjects(userId?: string): Promise<Web3Project[]> {
  try {
    // 获取项目基本信息
    const projects = await executeQuery<DbProject>(
      'SELECT * FROM web3_projects ORDER BY view_count DESC, created_at DESC'
    );

    // 如果提供了用户ID，获取用户的收藏列表
    let userBookmarks: Set<string> = new Set();
    if (userId) {
      const bookmarks = await executeQuery<DbBookmark>(
        'SELECT project_id FROM web3_user_bookmarks WHERE user_id = ?',
        [userId]
      );
      userBookmarks = new Set(bookmarks.map(b => b.project_id));
    }
    console.log('用户ID:', userId);
    console.log('用户收藏列表:', userBookmarks);
    // 获取项目分类数据
    const categories = await executeQuery<DbCategory>(
      'SELECT * FROM web3_categories'
    );
    const categoriesMap = categories.reduce((acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    }, {} as Record<string, DbCategory>);
    // 组装项目数据
    const result: Web3Project[] = projects.map(project => {
      // 解析项目标签JSON
      let tags: string[] = [];
      try {
        if (typeof project.tags === 'string') {
          tags = JSON.parse(project.tags);
        } else if (Array.isArray(project.tags)) {
          tags = project.tags;
        }
      } catch (error) {
        tags = [];
      }
      
      // 解析项目链JSON
      let chains: string[] = [];
      try {
        if (typeof project.chains === 'string') {
          chains = JSON.parse(project.chains);
        } else if (Array.isArray(project.chains)) {
          chains = project.chains;
        }
      } catch (error) {
        chains = [];
      }
      
      // 解析官方链接JSON
      let officialLinks;
      try {
        if (typeof project.official_links === 'string') {
          officialLinks = JSON.parse(project.official_links);
        } else if (typeof project.official_links === 'object') {
          officialLinks = project.official_links;
        }
      } catch {
        officialLinks = undefined;
      }

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        detailedDescription: project.detailed_description,
        category: project.category,
        categoryName: categoriesMap[project.category]?.name || '',
        subcategory: project.subcategory,
        subcategoryName: categoriesMap[project.subcategory]?.name || '',
        url: project.url,
        logo: project.logo,
        tags,
        chains,
        viewCount: project.view_count,
        isBookmarked: userId ? userBookmarks.has(project.id) : undefined,
        officialLinks
      };
    });

    return result;
  } catch (error) {
    console.error('获取项目失败:', error);
    throw error;
  }
}

// 根据ID获取单个项目
export async function getProjectById(id: string): Promise<Web3Project | null> {
  try {
    // 获取项目基本信息
    const project = await executeQuerySingle<DbProject>(
      'SELECT * FROM web3_projects WHERE id = ?',
      [id]
    );

    if (!project) {
      return null;
    }
    const categories = await executeQuery<DbCategory>(
      'SELECT * FROM web3_categories'
    );
    const categoriesMap = categories.reduce((acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    }, {} as Record<string, DbCategory>);
    // 解析项目标签JSON
    let tags: string[] = [];
    try {
      tags = project.tags ? JSON.parse(project.tags) : [];
    } catch {
      tags = [];
    }

    // 解析项目链JSON
    let chains: string[] = [];
    try {
      chains = project.chains ? JSON.parse(project.chains) : [];
    } catch {
      chains = [];
    }

    // 解析官方链接JSON
    let officialLinks;
    try {
      officialLinks = project.official_links ? JSON.parse(project.official_links) : undefined;
    } catch {
      officialLinks = undefined;
    }

    return {
      id: project.id,
      name: project.name,
      description: project.description,
      detailedDescription: project.detailed_description,
      category: project.category,
      categoryName: categoriesMap[project.category]?.name || '',
      subcategory: project.subcategory,
      subcategoryName: categoriesMap[project.subcategory]?.name || '',  
      url: project.url,
      logo: project.logo,
      tags,
      chains,
      viewCount: project.view_count,

      officialLinks
    };
  } catch (error) {
    console.error('获取项目失败:', error);
    throw error;
  }
}

// 根据分类获取项目
export async function getProjectsByCategory(category: number, subcategory?: number, userId?: string): Promise<Web3Project[]> {
  try {
    let query = 'SELECT * FROM web3_projects WHERE category = ?';
    const params: any[] = [category];

    if (subcategory) {
      query += ' AND subcategory = ?';
      params.push(subcategory);
    }

    query += ' ORDER BY view_count DESC, created_at DESC';

    const projects = await executeQuery<DbProject>(query, params);

    // 获取所有分类信息
    const categories = await executeQuery<DbCategory>(
      'SELECT id, name FROM web3_categories'
    );
    
    const categoriesMap = categories.reduce((acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    }, {} as Record<string, DbCategory>);

    // 如果提供了用户ID，获取用户的收藏列表
    let userBookmarks: Set<string> = new Set();
    if (userId) {
      const bookmarks = await executeQuery<DbBookmark>(
        'SELECT project_id FROM web3_user_bookmarks WHERE user_id = ?',
        [userId]
      );
      userBookmarks = new Set(bookmarks.map(b => b.project_id));
    }

    const result: Web3Project[] = projects.map(project => {
      // 解析项目标签JSON
      let tags: string[] = [];
      try {
        tags = project.tags ? JSON.parse(project.tags) : [];
      } catch {
        tags = [];
      }

      // 解析区块链JSON
      let chains: string[] = [];
      try {
        chains = project.chains ? JSON.parse(project.chains) : [];
      } catch {
        chains = [];
      }

      // 解析官方链接JSON
      let officialLinks;
      try {
        officialLinks = project.official_links ? JSON.parse(project.official_links) : undefined;
      } catch {
        officialLinks = undefined;
      }

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        detailedDescription: project.detailed_description,
        category: project.category,
        categoryName: categoriesMap[project.category]?.name || '',
        subcategory: project.subcategory,
        subcategoryName: categoriesMap[project.subcategory]?.name || '',
        url: project.url,
        logo: project.logo,
        tags,
        chains,
        viewCount: project.view_count,
        isBookmarked: userId ? userBookmarks.has(project.id) : undefined,
        officialLinks
      };
    });

    return result;
  } catch (error) {
    console.error('获取分类项目失败:', error);
    throw error;
  }
}

// 搜索项目
export async function searchProjects(keyword: string): Promise<Web3Project[]> {
  try {
    const projects = await executeQuery<DbProject>(
      `SELECT * FROM web3_projects 
       WHERE name LIKE ? OR description LIKE ? OR tags LIKE ?
       ORDER BY view_count DESC, created_at DESC`,
      [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );

    // 获取所有分类信息
    const categories = await executeQuery<DbCategory>(
      'SELECT id, name FROM web3_categories'
    );
    
    const categoriesMap = categories.reduce((acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    }, {} as Record<string, DbCategory>);

    const result: Web3Project[] = projects.map(project => {
      // 解析项目标签JSON
      let tags: string[] = [];
      try {
        tags = project.tags ? JSON.parse(project.tags) : [];
      } catch {
        tags = [];
      }

      // 解析区块链JSON
      let chains: string[] = [];
      try {
        chains = project.chains ? JSON.parse(project.chains) : [];
      } catch {
        chains = [];
      }

      // 解析官方链接JSON
      let officialLinks;
      try {
        officialLinks = project.official_links ? JSON.parse(project.official_links) : undefined;
      } catch {
        officialLinks = undefined;
      }

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        detailedDescription: project.detailed_description,
        category: project.category,
        categoryName: categoriesMap[project.category]?.name || '',
        subcategory: project.subcategory,
        subcategoryName: categoriesMap[project.subcategory]?.name || '',
        url: project.url,
        logo: project.logo,
        tags,
        chains,
        viewCount: project.view_count,
        officialLinks
      };
    });

    return result;
  } catch (error) {
    console.error('搜索项目失败:', error);
    throw error;
  }
}

// 获取最新新闻
export async function getLatestNews(limit: number = 20): Promise<ProjectNews[]> {
  try {
    const news = await executeQuery<DbNews>(
      'SELECT * FROM web3_news ORDER BY published_at DESC LIMIT ?',
      [limit.toString()]
    );

    return news.map(n => ({
      id: n.id,
      title: n.title,
      summary: n.summary,
      publishedAt: n.published_at,
      url: n.url,
      source: n.source
    }));
  } catch (error) {
    console.error('获取最新新闻失败:', error);
    throw error;
  }
}

// 获取项目新闻（分页）
export async function getProjectNews(
  projectId: number, 
  page: number = 1, 
  limit: number = 10
): Promise<{
  news: ProjectNews[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  try {
    const offset = (page - 1) * limit;
    
    // 获取总数
    const countResult = await executeQuerySingle<{ count: number }>(
      'SELECT COUNT(*) as count FROM web3_news WHERE project_id = ?',
      [projectId.toString()]
    );
    const total = countResult?.count || 0;
    
    // 获取分页数据
    const news = await executeQuery<DbNews>(
      'SELECT * FROM web3_news WHERE project_id = ? ORDER BY published_at DESC LIMIT ? OFFSET ?',
      [projectId.toString(), limit.toString(), offset.toString()]
    );

    const totalPages = Math.ceil(total / limit);

    return {
      news: news.map(n => ({
        id: n.id,
        title: n.title,
        summary: n.summary,
        publishedAt: n.published_at,
        url: n.url,
        source: n.source
      })),
      total,
      page,
      limit,
      totalPages
    };
  } catch (error) {
    console.error('获取项目新闻失败:', error);
    throw error;
  }
}
