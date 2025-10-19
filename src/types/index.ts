export interface ProjectNews {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  url: string;
  source?: string;
}



export interface Web3Project {
  id: string;
  name: string;
  description: string;
  detailedDescription?: string; // 详细介绍，约500字
  category: string;
  subcategory?: string;
  url: string;
  logo?: string;
  tags: string[]; // 项目标签数组，存储为JSON格式
  chains: string[]; // 项目所属的区块链数组
  viewCount: number; // 项目浏览次数
  news?: ProjectNews[]; // 项目相关新闻
  isBookmarked?: boolean; // 当前用户是否收藏了该项目
  officialLinks?: {
    website?: string;
    whitepaper?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
    github?: string;
    medium?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  count: number;
}

export interface SearchFilters {
  category: string;
  subcategory: string;
  tags: string[];
}