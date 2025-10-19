import { executeQuery, executeQuerySingle } from './database';
import { Web3Project, Category, ProjectNews, Subcategory } from '@/types';

// 数据库字段到接口的映射
interface DbProject {
  id: string;
  name: string;
  description: string;
  detailed_description?: string;
  category: string;
  subcategory?: string;
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
          id: sub.slug,
          name: sub.name,
          count: sub.project_count
        }));

      return {
        id: cat.slug,
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
        subcategory: project.subcategory,
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
      subcategory: project.subcategory,
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
export async function getProjectsByCategory(category: string, subcategory?: string, userId?: string): Promise<Web3Project[]> {
  try {
    let query = 'SELECT * FROM web3_projects WHERE category = ?';
    const params: any[] = [category];

    if (subcategory) {
      query += ' AND subcategory = ?';
      params.push(subcategory);
    }

    query += ' ORDER BY view_count DESC, created_at DESC';

    const projects = await executeQuery<DbProject>(query, params);

    // 如果提供了用户ID，获取用户的收藏列表
    let userBookmarks: Set<string> = new Set();
    if (userId) {
      const bookmarks = await executeQuery<DbBookmark>(
        'SELECT project_id FROM web3_user_bookmarks WHERE user_id = ?',
        [userId]
      );
      userBookmarks = new Set(bookmarks.map(b => b.project_id));
    }

    // 获取所有项目的新闻
    const projectIds = projects.map(p => p.id);
    let allNews: DbNews[] = [];
    
    if (projectIds.length > 0) {
      const placeholders = projectIds.map(() => '?').join(',');
      allNews = await executeQuery<DbNews>(
        `SELECT * FROM web3_news WHERE project_id IN (${placeholders}) ORDER BY published_at DESC`,
        projectIds
      );
    }

    // 按项目ID分组新闻
    const newsByProject = allNews.reduce((acc, news) => {
      if (!acc[news.project_id!]) {
        acc[news.project_id!] = [];
      }
      acc[news.project_id!].push(news);
      return acc;
    }, {} as Record<string, DbNews[]>);

    const result: Web3Project[] = projects.map(project => {
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

      // 获取该项目的新闻
      const projectNews = newsByProject[project.id] || [];

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        detailedDescription: project.detailed_description,
        category: project.category,
        subcategory: project.subcategory,
        url: project.url,
        logo: project.logo,
        tags,
        chains,
        viewCount: project.view_count,
        isBookmarked: userId ? userBookmarks.has(project.id) : undefined,
        news: projectNews.map(n => ({
          id: n.id,
          title: n.title,
          summary: n.summary,
          publishedAt: n.published_at,
          url: n.url,
          source: n.source
        })),
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
       WHERE MATCH(name, description) AGAINST(? IN NATURAL LANGUAGE MODE)
       OR name LIKE ? OR description LIKE ?
       ORDER BY view_count DESC, created_at DESC`,
      [keyword, `%${keyword}%`, `%${keyword}%`]
    );

    const result: Web3Project[] = projects.map(project => {
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
        subcategory: project.subcategory,
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



// 获取用户收藏的项目
export async function getUserBookmarks(userId: string): Promise<Web3Project[]> {
  try {
    const bookmarks = await executeQuery<DbProject>(
      `SELECT p.* FROM web3_projects p 
       INNER JOIN web3_user_bookmarks b ON p.id = b.project_id 
       WHERE b.user_id = ? 
       ORDER BY b.created_at DESC`,
      [userId]
    );

    // 获取所有收藏项目的新闻
    const projectIds = bookmarks.map(p => p.id);
    let allNews: DbNews[] = [];
    
    if (projectIds.length > 0) {
      const placeholders = projectIds.map(() => '?').join(',');
      allNews = await executeQuery<DbNews>(
        `SELECT * FROM web3_news WHERE project_id IN (${placeholders}) ORDER BY published_at DESC`,
        projectIds
      );
    }

    // 按项目ID分组新闻
    const newsByProject = allNews.reduce((acc, news) => {
      if (!acc[news.project_id!]) {
        acc[news.project_id!] = [];
      }
      acc[news.project_id!].push(news);
      return acc;
    }, {} as Record<string, DbNews[]>);

    const result: Web3Project[] = bookmarks.map(project => {
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

      // 获取该项目的新闻
      const projectNews = newsByProject[project.id] || [];

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        detailedDescription: project.detailed_description,
        category: project.category,
        subcategory: project.subcategory,
        url: project.url,
        logo: project.logo,
        tags,
        chains,
        viewCount: project.view_count,
        news: projectNews.map(n => ({
          id: n.id,
          title: n.title,
          summary: n.summary,
          publishedAt: n.published_at,
          url: n.url,
          source: n.source
        })),
        officialLinks
      };
    });

    return result;
  } catch (error) {
    console.error('获取用户收藏失败:', error);
    throw error;
  }
}

// 检查用户是否收藏了某个项目
export async function isProjectBookmarked(userId: string, projectId: string): Promise<boolean> {
  try {
    const bookmark = await executeQuerySingle<DbBookmark>(
      'SELECT id FROM web3_user_bookmarks WHERE user_id = ? AND project_id = ?',
      [userId, projectId]
    );
    return !!bookmark;
  } catch (error) {
    console.error('检查收藏状态失败:', error);
    throw error;
  }
}