'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import ProjectSubmissionForm from '@/components/ProjectSubmissionForm';
import PermissionModal from '@/components/PermissionModal';

export default function AddProjectPage() {
  const { data: session, status } = useSession();
  console.log('session', session);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'admin'>('login');

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
  const canSubmitProject = session && session.user?.isAdmin;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            提交新项目
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            欢迎向 Web3 Compass 提交您的项目！我们致力于为用户提供最全面的 Web3 项目信息。
            请填写以下表单，您的项目将直接添加到平台中。
          </p>
        </div>
        
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            📋 提交指南
          </h2>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• 请确保项目信息准确完整，包括项目名称、描述、官方网址等</li>
            <li>• 选择正确的项目分类和支持的区块链网络</li>
            <li>• 提供清晰的项目标签，帮助用户更好地发现您的项目</li>
            <li>• 官方链接将帮助用户了解更多项目详情</li>
            <li>• 只有管理员用户才能提交项目，如需权限请联系管理员</li>
          </ul>
        </div>

        {canSubmitProject ? (
          <ProjectSubmissionForm />
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