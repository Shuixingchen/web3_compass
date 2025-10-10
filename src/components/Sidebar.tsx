'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { Category } from '@/types';
import Tooltip from './Tooltip';
import clsx from 'clsx';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  selectedSubcategory: string;
  onCategoryChange: (category: string, subcategory?: string) => void;
}

export default function Sidebar({ 
  categories,
  selectedCategory, 
  selectedSubcategory, 
  onCategoryChange 
}: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategoryClick = (categoryId: string) => {
    // 点击分类时同时选择分类和控制展开/收起
    onCategoryChange(categoryId);
    toggleCategory(categoryId);
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    onCategoryChange(categoryId, subcategoryId);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={clsx(
      'bg-white border-r border-gray-200 h-screen overflow-y-auto transition-all duration-300 ease-in-out',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* 顶部标题和折叠按钮 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Web3 导航
              </h1>
              <p className="text-xs text-gray-600 mt-1">
                发现最优秀的Web3项目
              </p>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={isCollapsed ? '展开侧边栏' : '收起侧边栏'}
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5 text-gray-600" />
            ) : (
              <X className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        
        <nav className="space-y-2">
          {/* 分类导航 */}
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);
            const isSelected = selectedCategory === category.id;
            
            return (
              <div key={category.id} className="space-y-1">
                <Tooltip content={category.name} disabled={!isCollapsed}>
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={clsx(
                      'w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors',
                      isSelected 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50',
                      isCollapsed ? 'justify-center' : 'justify-between'
                    )}
                  >
                    <div className={clsx('flex items-center', isCollapsed ? 'justify-center' : '')}>
                      <span className={clsx(isCollapsed ? '' : 'mr-3')}>{category.icon}</span>
                      {!isCollapsed && <span className="font-medium">{category.name}</span>}
                    </div>
                    {!isCollapsed && category.subcategories && (
                      <div className="flex items-center">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </div>
                    )}
                  </button>
                </Tooltip>

                {/* 子分类 */}
                {!isCollapsed && isExpanded && category.subcategories && (
                  <div className="ml-6 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        onClick={() => handleSubcategoryClick(category.id, subcategory.id)}
                        className={clsx(
                          'w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors text-sm',
                          selectedSubcategory === subcategory.id && selectedCategory === category.id
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-600 hover:bg-gray-50'
                        )}
                      >
                        <span>{subcategory.name}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {subcategory.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}