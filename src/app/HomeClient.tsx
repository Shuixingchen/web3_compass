'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import FilterDropdown from '@/components/FilterDropdown';
import ProjectCard from '@/components/ProjectCard';
import { Web3Project, Category, Chain } from '@/types';

interface HomeClientProps {
  projects: Web3Project[];
  categories: Category[];
  chains: Chain[];
}

export default function HomeClient({ projects, categories, chains }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  // console.log('projects', projects);
  // 筛选和搜索逻辑
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // 按分类筛选
    if (selectedCategory && selectedCategory > 0) {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // 按子分类筛选
    if (selectedSubcategory && selectedSubcategory > 0) {
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
      } else if (sortBy === 'viewCount') {
        return b.viewCount - a.viewCount; // 按浏览次数降序排列
      }
      return 0;
    });

    return filtered;
  }, [projects, selectedCategory, selectedSubcategory, searchTerm, sortBy]);

  const handleCategoryChange = (category: number, subcategory?: number) => {
    console.log('category', category);
    console.log('subcategory', subcategory);
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory || 0);
  };


  // 链选项
  const chainOptions = [
    { id: 'all', name: '全部链' },
    ...(chains || []).map(chain => ({
      id: chain.symbol.toLowerCase(),
      name: chain.name
    }))
  ];

  // 目录选项
  const directoryOptions = [
    { id: 'all', name: '全部目录' },
    ...(categories || []).map(category => ({
      id: category.id.toString(),
      name: category.name
    }))
  ];

  // 排序选项
  const sortOptions = [
    { id: 'name', name: '按名称排序' },
    { id: 'viewCount', name: '按浏览次数排序' }
  ];

  const [selectedChain, setSelectedChain] = useState('all');
  const [selectedDirectory, setSelectedDirectory] = useState('all');

  // 获取当前分类信息
  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const categoryName = selectedCategory && selectedCategory > 0 ? currentCategory?.name : '全部项目';

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 左侧导航栏 */}
      <Sidebar
        categories={categories}
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
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <SearchBar
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      placeholder="搜索Web3项目、DeFi、NFT、DAO..."
                    />
                  </div>
                  <Link
                    href="/add-project"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">提交新项目</span>
                    <span className="sm:hidden">提交</span>
                  </Link>
                </div>
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
              <FilterDropdown
                label="排序"
                options={sortOptions}
                selected={sortBy}
                onSelect={setSortBy}
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