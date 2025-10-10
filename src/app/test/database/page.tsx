import { testConnection, executeQuery } from '@/lib/database';
import { getCategories, getProjects } from '@/lib/data-access';

export default async function DatabaseTestPage() {
  let connectionStatus = 'Unknown';
  let categoriesData = null;
  let projectsData = null;
  let error = null;

  try {
    // 测试数据库连接
    await testConnection();
    connectionStatus = 'Connected';

    // 测试获取分类数据
    categoriesData = await getCategories();

    // 测试获取项目数据（限制前5个）
    projectsData = await executeQuery('SELECT * FROM web3_projects LIMIT 5');

  } catch (err: any) {
    error = err.message;
    connectionStatus = 'Failed';
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">数据库连接测试</h1>
        
        {/* 连接状态 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">连接状态</h2>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            connectionStatus === 'Connected' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {connectionStatus === 'Connected' ? '✅ 连接成功' : '❌ 连接失败'}
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">错误信息: {error}</p>
            </div>
          )}
        </div>

        {/* 分类数据 */}
        {categoriesData && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">分类数据 ({categoriesData.length} 条)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoriesData.map((category: any) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">子分类: {category.subcategories.length} 个</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {category.subcategories.slice(0, 3).map((sub: any) => (
                          <span key={sub.id} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {sub.name}
                          </span>
                        ))}
                        {category.subcategories.length > 3 && (
                          <span className="text-xs text-gray-500">+{category.subcategories.length - 3} 更多</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 项目数据 */}
        {projectsData && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">项目数据 (前5条)</h2>
            <div className="space-y-4">
              {projectsData.map((project: any) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {project.category_name}
                        </span>
                        {project.subcategory_name && (
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            {project.subcategory_name}
                          </span>
                        )}
                      </div>
                    </div>
                    {project.view_count && (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {project.view_count} 次浏览
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}