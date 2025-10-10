import { getTags, getProjects } from '@/lib/data-access';

export default async function TagsTestPage() {
  try {
    // 获取所有标签
    const tags = await getTags();
    
    // 获取前5个项目来测试标签显示
    const projects = await getProjects();
    const firstFiveProjects = projects.slice(0, 5);

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">标签功能测试页面</h1>
        
        {/* 标签列表 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">所有可用标签 ({tags.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tags.map((tag) => (
              <div 
                key={tag.id} 
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span 
                    className="px-2 py-1 rounded text-sm font-medium text-white"
                    style={{ backgroundColor: tag.color || '#6B7280' }}
                  >
                    {tag.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    使用次数: {tag.usageCount}
                  </span>
                </div>
                {tag.category && (
                  <div className="text-sm text-gray-600 mb-1">
                    分类: {tag.category}
                  </div>
                )}
                {tag.description && (
                  <div className="text-sm text-gray-700">
                    {tag.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 项目标签测试 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">项目标签测试 (前5个项目)</h2>
          <div className="space-y-4">
            {firstFiveProjects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  标签数量: {project.tags.length}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-red-600">标签功能测试失败</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            错误信息: {error instanceof Error ? error.message : '未知错误'}
          </p>
        </div>
      </div>
    );
  }
}