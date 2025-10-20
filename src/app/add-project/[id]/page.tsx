'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProjectSubmissionForm from '@/components/ProjectSubmissionForm';
import PermissionModal from '@/components/PermissionModal';
import { Web3Project } from '@/types';

export default function EditProjectPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const projectId = params.id as string;
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'admin'>('login');
  const [project, setProject] = useState<Web3Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取项目数据
  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`/api/projects/${projectId}`);
        
        if (!response.ok) {
          throw new Error('项目不存在或获取失败');
        }
        
        const data = await response.json();
        if (data.success) {
          setProject(data.project);
        } else {
          throw new Error(data.message || '获取项目失败');
        }
      } catch (error) {
        console.error('获取项目失败:', error);
        setError(error instanceof Error ? error.message : '获取项目失败');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (status === 'loading') return; // 还在加载中

    if (!session) {
      // 用户未登录
      setModalType('login');
      setShowModal(true);
    } else if (!session.user?.isAdmin) {
      // 用户已登录但不是管理员
      setModalType('admin');
      setShowModal(true);
    }
  }, [session, status]);

  // 如果用户已登录且是管理员，显示正常页面
  const canEditProject = session && session.user?.isAdmin;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-gray-500">正在加载项目信息...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            编辑项目
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            编辑项目信息。请确保所有信息准确完整，修改后的项目将立即在平台上更新。
          </p>
        </div>
        
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            📋 编辑指南
          </h2>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• 请确保项目信息准确完整，包括项目名称、描述、官方网址等</li>
            <li>• 选择正确的项目分类和支持的区块链网络</li>
            <li>• 提供清晰的项目标签，帮助用户更好地发现您的项目</li>
            <li>• 官方链接将帮助用户了解更多项目详情</li>
            <li>• 只有管理员用户才能编辑项目，如需权限请联系管理员</li>
          </ul>
        </div>

        {canEditProject && project ? (
          <ProjectSubmissionForm 
            initialData={project}
            isEditMode={true}
            projectId={projectId}
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {status === 'loading' ? '正在验证权限...' : '请先完成身份验证'}
            </div>
          </div>
        )}
      </div>

      {/* 权限弹窗 */}
      <PermissionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
      />
    </div>
  );
}