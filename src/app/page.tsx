'use client';

import { useState, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import FilterDropdown from '@/components/FilterDropdown';
import ProjectCard from '@/components/ProjectCard';
import { projects, categories } from '@/data/projects';
import { Web3Project } from '@/types';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // 筛选和搜索逻辑
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // 按分类筛选
    if (selectedCategory) {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // 按子分类筛选
    if (selectedSubcategory) {
      filtered = filtered.filter(project => project.subcategory === selectedSubcategory);
    }

    // 搜索筛选
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // 排序
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return filtered;
  }, [selectedCategory, selectedSubcategory, searchTerm, sortBy]);

  const handleCategoryChange = (category: string, subcategory?: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory || '');
  };

  // 排序选项
  const sortOptions = [
    { id: 'name', name: '按名称排序' },
    { id: 'featured', name: '推荐优先' }
  ];

  // 链选项
  const chainOptions = [
    { id: 'all', name: '全部链' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'bsc', name: 'BSC' },
    { id: 'polygon', name: 'Polygon' },
    { id: 'arbitrum', name: 'Arbitrum' },
    { id: 'optimism', name: 'Optimism' }
  ];

  // 目录选项
  const directoryOptions = [
    { id: 'all', name: '全部目录' },
    { id: 'defi', name: 'DeFi' },
    { id: 'nft', name: 'NFT' },
    { id: 'dao', name: 'DAO' },
    { id: 'infrastructure', name: '基础设施' },
    { id: 'tools', name: '工具' }
  ];

  const [selectedChain, setSelectedChain] = useState('all');
  const [selectedDirectory, setSelectedDirectory] = useState('all');

  // 获取当前分类信息
  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const categoryName = selectedCategory ? currentCategory?.name : '全部项目';

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 左侧导航栏 */}
      <Sidebar
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部搜索和筛选栏 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* 搜索框区域 */}
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-3xl">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  placeholder="搜索Web3项目、DeFi、NFT、DAO..."
                />
              </div>
            </div>
            
            {/* 筛选选项区域 */}
            <div className="flex flex-wrap justify-center gap-4">
              <FilterDropdown
                label="Chain"
                options={chainOptions}
                selected={selectedChain}
                onSelect={setSelectedChain}
              />
              <FilterDropdown
                label="目录"
                options={directoryOptions}
                selected={selectedDirectory}
                onSelect={setSelectedDirectory}
              />
            </div>
          </div>
        </div>

        {/* 项目列表 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* 页面标题和统计 */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {categoryName}
              </h1>
              <p className="text-gray-600">
                找到 {filteredProjects.length} 个项目
                {searchTerm && ` · 搜索 "${searchTerm}"`}
              </p>
            </div>

            {/* 项目网格 */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  没有找到匹配的项目
                </h3>
                <p className="text-gray-600">
                  尝试调整搜索条件或浏览其他分类
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
