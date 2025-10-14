import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
import { getProjects, getCategories } from '@/lib/data-access';
import HomeClient from './HomeClient';

export default async function Home() {
  // 获取用户会话信息
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string | undefined;

  // 在服务器端获取数据
  const [projects, categories] = await Promise.all([
    getProjects(userId),
    getCategories()
  ]);
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">加载中...</p>
      </div>
    </div>}>
      <HomeClient projects={projects} categories={categories} />
    </Suspense>
  );
}
