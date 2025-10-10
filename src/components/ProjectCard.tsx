'use client';

import { ExternalLink, Eye, Heart, Link } from 'lucide-react';
import { Web3Project } from '@/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

interface ProjectCardProps {
  project: Web3Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/project/${project.id}`);
  };

  const handleVisit = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200 group relative cursor-pointer"
    >
      {/* 收藏按钮 - 右上角 */}
      <button
        onClick={handleFavorite}
        className={clsx(
          'absolute top-4 right-4 p-2 rounded-lg transition-all duration-200',
          isFavorited 
            ? 'text-red-500 bg-red-50 hover:bg-red-100' 
            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
        )}
        title={isFavorited ? '取消收藏' : '收藏项目'}
      >
        <Heart className={clsx('w-5 h-5', isFavorited && 'fill-current')} />
      </button>

      <div className="flex items-start mb-4 pr-12">
        <div className="flex items-center space-x-3">
          {project.logo ? (
            <img 
              src={project.logo} 
              alt={project.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {project.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center space-x-1 mt-1">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-600 font-medium">{project.viewCount.toLocaleString()} 次浏览</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Chains 显示 */}
      {project.chains && project.chains.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-1 mb-2">
            <Link className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500 font-medium">支持链</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {project.chains.map((chain, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200"
              >
                {chain}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2 mb-4">
           {project.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
          >
            {tag}
          </span>
        ))}
        </div>
        <button
          onClick={handleVisit}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
        >
          <ExternalLink className="w-3 h-3 ml-1" />
        </button>
      </div>
    </div>
  );
}