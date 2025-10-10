'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, Globe, FileText, Twitter, MessageCircle, Github, BookOpen } from 'lucide-react';
import { projects } from '@/data/projects';
import { Web3Project } from '@/types';
import ProjectNewsList from '@/components/ProjectNewsList';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const project = projects.find((p: Web3Project) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">项目未找到</h1>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </button>
        </div>
      </div>
    );
  }

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
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 mb-6 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧主要内容 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 项目头部信息 */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  {project.logo ? (
                    <img src={project.logo} alt={project.name} className="w-full h-full rounded-xl object-cover" />
                  ) : (
                    project.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
                  <p className="text-lg text-gray-600">{project.description}</p>
                  {project.featured && (
                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                      推荐
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleVisitWebsite}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                访问官网
              </button>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 分类信息 */}
            <div className="text-sm text-gray-500">
              分类: {project.category} {project.subcategory && `> ${project.subcategory}`}
            </div>
          </div>

              {/* 项目详细介绍 */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">项目介绍</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {project.detailedDescription || project.description}
                  </p>
                </div>
              </div>

              {/* 官方链接 */}
              {project.officialLinks && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">官方链接</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(project.officialLinks).map(([type, url]) => (
                      url && (
                        <a
                          key={type}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                          <div className="text-blue-600 group-hover:text-blue-700">
                            {getLinkIcon(type)}
                          </div>
                          <span className="font-medium text-gray-900 group-hover:text-blue-700">
                            {getLinkLabel(type)}
                          </span>
                          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 ml-auto" />
                        </a>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 右侧新闻列表 */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <ProjectNewsList 
                  news={project.news || []} 
                  projectName={project.name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}