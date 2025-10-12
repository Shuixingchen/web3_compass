import { Metadata } from 'next';
import ProjectSubmissionForm from '@/components/ProjectSubmissionForm';

export const metadata: Metadata = {
  title: '提交新项目 - Web3 Compass',
  description: '向 Web3 Compass 提交您的项目，让更多用户发现您的 Web3 应用',
};

export default function AddProjectPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            提交新项目
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            欢迎向 Web3 Compass 提交您的项目！我们致力于为用户提供最全面的 Web3 项目信息。
            请填写以下表单，我们会在审核后将您的项目添加到平台中。
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
            <li>• 我们会在 1-3 个工作日内审核您的提交</li>
          </ul>
        </div>

        <ProjectSubmissionForm />
      </div>
    </div>
  );
}