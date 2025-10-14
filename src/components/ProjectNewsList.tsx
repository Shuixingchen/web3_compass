'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ExternalLink, Clock, Loader2 } from 'lucide-react';
import { ProjectNews } from '@/types';

interface ProjectNewsListProps {
  projectId: string;
  projectName: string;
}

interface NewsResponse {
  news: ProjectNews[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ProjectNewsList({ projectId, projectName }: ProjectNewsListProps) {
  const [news, setNews] = useState<ProjectNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10; // 每页显示10条新闻

  // 获取新闻数据的函数
  const fetchNews = useCallback(async (page: number, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const response = await fetch(`/api/projects/${projectId}/news?page=${page}&limit=${itemsPerPage}`);
      
      if (!response.ok) {
        throw new Error('获取新闻数据失败');
      }
      
      const data: NewsResponse = await response.json();
      
      if (append) {
        // 追加新数据
        setNews(prevNews => [...prevNews, ...data.news]);
      } else {
        // 替换数据（首次加载）
        setNews(data.news);
      }
      
      setCurrentPage(data.page);
      setHasMore(data.page < data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取新闻数据失败');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [projectId, itemsPerPage]);

  // 滚动到底部检测
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
    
    console.log('Scroll event:', {
      scrollTop: Math.round(scrollTop),
      scrollHeight,
      clientHeight,
      isNearBottom,
      loadingMore,
      hasMore,
      currentPage
    });
    
    if (isNearBottom && !loadingMore && hasMore) {
      console.log('🚀 Loading next page:', currentPage + 1);
      fetchNews(currentPage + 1, true);
    }
  }, [loadingMore, hasMore, currentPage, fetchNews]);

  // 组件挂载时获取第一页数据
  useEffect(() => {
    fetchNews(1);
  }, [projectId]);

  // 移除了useEffect中的事件监听器，改为直接在JSX中使用onScroll

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return '1天前';
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks}周前`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months}个月前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  };

  if (!news || news.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Clock className="h-4 w-4 mr-2 text-blue-600" />
          最新动态
        </h2>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">📰</div>
          <p className="text-gray-500 text-sm">暂无相关新闻</p>
        </div>
      </div>
    );
  }

  // 加载状态
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
        <h2 className="text-lg font-bold text-gray-900 flex items-center mb-4">
          <Clock className="h-4 w-4 mr-2 text-blue-600" />
          最新动态
        </h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
          <span className="text-gray-500">加载中...</span>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
        <h2 className="text-lg font-bold text-gray-900 flex items-center mb-4">
          <Clock className="h-4 w-4 mr-2 text-blue-600" />
          最新动态
        </h2>
        <div className="text-center py-8">
          <div className="text-red-400 mb-2">⚠️</div>
          <p className="text-red-500 text-sm">{error}</p>
          <button 
            onClick={() => fetchNews(1)}
            className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center">
          <Clock className="h-4 w-4 mr-2 text-blue-600" />
          最新动态
        </h2>
      </div>
      
      {/* 新闻列表容器 */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {news.map((item: ProjectNews) => (
          <div
            key={item.id}
            className="border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow"
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 mr-2">
                  {item.title}
                </h3>
                <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-0.5" />
              </div>
              
              <p className="text-xs text-gray-600 line-clamp-3">
                {item.summary}
              </p>
            </a>
          </div>
        ))}
        
        {/* 加载更多指示器 */}
        {loadingMore && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600 mr-2" />
            <span className="text-sm text-gray-500">加载更多...</span>
          </div>
        )}
        
        {/* 没有更多数据提示 */}
        {!hasMore && news.length > 0 && (
          <div className="text-center py-4">
            <p className="text-xs text-gray-400">已显示全部新闻</p>
          </div>
        )}
      </div>
    </div>
  );
}