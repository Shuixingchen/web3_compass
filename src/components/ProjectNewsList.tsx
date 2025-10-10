'use client';

import { useState } from 'react';
import { ExternalLink, Clock, ChevronDown } from 'lucide-react';
import { ProjectNews } from '@/types';

interface ProjectNewsListProps {
  news: ProjectNews[];
  projectName: string;
}

export default function ProjectNewsList({ news, projectName }: ProjectNewsListProps) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLoadMore = () => {
    if (visibleCount >= news.length) {
      setVisibleCount(5);
      setIsExpanded(false);
    } else {
      setVisibleCount(Math.min(visibleCount + 5, news.length));
      setIsExpanded(visibleCount + 5 >= news.length);
    }
  };

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
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-blue-600" />
          最新动态
        </h2>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">📰</div>
          <p className="text-gray-500">暂无相关新闻</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <Clock className="h-5 w-5 mr-2 text-blue-600" />
        最新动态
      </h2>
      
      <div className="space-y-4">
        {news.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 mr-2">
                  {item.title}
                </h3>
                <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-0.5" />
              </div>
              
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {item.summary}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(item.publishedAt)}
                </span>
                {item.source && (
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                    {item.source}
                  </span>
                )}
              </div>
            </a>
          </div>
        ))}
      </div>

      {news.length > 5 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronDown className="h-4 w-4 mr-1 rotate-180 transition-transform" />
                收起
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1 transition-transform" />
                查看更多 ({news.length - visibleCount} 条)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}