'use client';

import { ExternalLink, Star, Heart } from 'lucide-react';
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
            {project.featured && (
              <div className="flex items-center space-x-1 mt-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-xs text-yellow-600 font-medium">推荐</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

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

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          {project.subcategory && (
            <span className="capitalize">{project.subcategory}</span>
          )}
        </div>
        <button
          onClick={handleVisit}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
        >
          访问
          <ExternalLink className="w-3 h-3 ml-1" />
        </button>
      </div>
    </div>
  );
}