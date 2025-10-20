'use client';

import { X, AlertCircle, MessageCircle } from 'lucide-react';

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'admin';
}

export default function PermissionModal({ isOpen, onClose, type }: PermissionModalProps) {
  if (!isOpen) return null;

  const isLoginRequired = type === 'login';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* 弹窗内容 */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* 图标和标题 */}
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isLoginRequired ? '需要登录' : '权限不足'}
          </h3>
        </div>

        {/* 内容 */}
        <div className="mb-6">
          {isLoginRequired ? (
            <p className="text-gray-600 mb-4">
              您需要先登录才能提交项目。请点击右上角的登录按钮进行登录。
            </p>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                只有管理员用户才能提交项目。如果您需要提交项目，请联系网站管理员获取权限。
              </p>
              
              {/* 管理员联系信息 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <MessageCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-900">联系管理员</span>
                </div>
                <div className="text-sm text-blue-800">
                  <p className="mb-1">Telegram: @web3compass_admin</p>
                  <p className="text-xs text-blue-600">
                    请说明您的项目信息和申请管理员权限的原因
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 按钮 */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
}