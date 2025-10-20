'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, Globe, FileText, Twitter, MessageCircle, Github, BookOpen, Eye, Link } from 'lucide-react';
import { Web3Project } from '@/types';
import ProjectNewsList from '@/components/ProjectNewsList';

interface ProjectDetailClientProps {
  project: Web3Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();

  const handleVisitWebsite = () => {
    window.open(project.url, '_blank');
  };

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'website':
        return <Globe className="h-5 w-5" />;
      case 'whitepaper':
        return <FileText className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'telegram':
        return <MessageCircle className="h-5 w-5" />;
      case 'discord':
        return <MessageCircle className="h-5 w-5" />;
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'medium':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  const getLinkLabel = (type: string) => {
    switch (type) {
      case 'website':
        return '官方网站';
      case 'whitepaper':
        return '白皮书';
      case 'twitter':
        return 'Twitter';
      case 'telegram':
        return 'Telegram';
      case 'discord':
        return 'Discord';
      case 'github':
        return 'GitHub';
      case 'medium':
        return 'Medium';
      default:
        return '链接';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 顶部导航 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            返回项目列表
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧主要内容 */}
          <div className="lg:col-span-3 space-y-8">
            {/* 项目头部信息 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-4xl font-bold text-gray-900">{project.name}</h1>
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      <Eye className="w-4 h-4" />
                      <span>{project.viewCount.toLocaleString()} 次浏览</span>
                    </div>
                  </div>
                  <p className="text-xl text-gray-600 mb-4">{project.description}</p>
                  
                  {/* 分类和标签 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {project.categoryName}
                    </span>
                    {project.subcategoryName && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                        {project.subcategoryName}
                      </span>
                    )}
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Chains 显示 */}
                  {project.chains && project.chains.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Link className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-900">支持的区块链</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.chains.map((chain, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-lg border border-green-200"
                          >
                            {chain}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 访问网站按钮 */}
              <button
                onClick={handleVisitWebsite}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Globe className="h-5 w-5" />
                访问官方网站
              </button>
            </div>

            {/* 官方链接 */}
            {project.officialLinks && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">官方链接</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(project.officialLinks).map(([type, url]) => (
                    url && (
                      <a
                        key={type}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100"
                      >
                        <div className="text-gray-500 group-hover:text-blue-600 transition-colors">
                          {getLinkIcon(type)}
                        </div>
                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors font-medium">
                          {getLinkLabel(type)}
                        </span>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors ml-auto" />
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* 详细介绍 */}
            {project.detailedDescription && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">项目介绍</h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {project.detailedDescription.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 右侧新闻列表 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProjectNewsList projectId={project.id.toString()} projectName={project.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}