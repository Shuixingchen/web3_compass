'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/types';

interface ProjectSubmissionData {
  name: string;
  description: string;
  detailedDescription: string;
  category: number;
  subcategory: number;
  url: string;
  logo: string;
  tags: string[];
  chains: string[];
  officialLinks: {
    website: string;
    whitepaper?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
    github?: string;
    medium?: string;
  };
}

interface ChainData {
  symbol: string;
  name: string;
  sort: number;
}

export default function ProjectSubmissionForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableChains, setAvailableChains] = useState<ChainData[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingChains, setIsLoadingChains] = useState(true);
  
  // 获取分类数据
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await fetch('/api/categories');
        const data = await response.json();
        
        if (data.success) {
          setCategories(data.categories);
        } else {
          console.error('获取分类失败:', data.message);
          setSubmitMessage('获取分类数据失败，请刷新页面重试');
        }
      } catch (error) {
        console.error('获取分类失败:', error);
        setSubmitMessage('获取分类数据失败，请刷新页面重试');
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // 获取区块链数据
  useEffect(() => {
    const fetchChains = async () => {
      try {
        setIsLoadingChains(true);
        const response = await fetch('/api/chains');
        const data = await response.json();
        
        if (data.success) {
          setAvailableChains(data.chains);
        } else {
          console.error('获取区块链数据失败:', data.message);
          setSubmitMessage('获取区块链数据失败，请刷新页面重试');
        }
      } catch (error) {
        console.error('获取区块链数据失败:', error);
        setSubmitMessage('获取区块链数据失败，请刷新页面重试');
      } finally {
        setIsLoadingChains(false);
      }
    };

    fetchChains();
  }, []);
  
  const [formData, setFormData] = useState<ProjectSubmissionData>({
    name: '',
    description: '',
    detailedDescription: '',
    category: 0,
    subcategory: 0,
    url: '',
    logo: '',
    tags: [],
    chains: [],
    officialLinks: {
      website: '',
      whitepaper: '',
      twitter: '',
      telegram: '',
      discord: '',
      github: '',
      medium: ''
    }
  });

  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  const validateField = (field: string, value: string) => {
    const urlPattern = /^https?:\/\/.+\..+/;
    
    switch (field) {
      case 'name':
        if (!value) return '项目名称不能为空';
        if (value.length < 2 || value.length > 50) return '项目名称长度应在2-50个字符之间';
        break;
      case 'description':
        if (!value) return '项目描述不能为空';
        if (value.length < 10 || value.length > 200) return '项目描述长度应在10-200个字符之间';
        break;
      case 'detailedDescription':
        if (value && value.length > 1000) return '详细描述不能超过1000个字符';
        break;
      case 'url':
        if (!value) return '项目网址不能为空';
        if (!urlPattern.test(value)) return '请输入有效的项目网址（需要包含http://或https://）';
        break;
      case 'logo':
        if (value && !urlPattern.test(value)) return '请输入有效的Logo网址（需要包含http://或https://）';
        break;
      case 'category':
        if (!value) return '请选择项目分类';
        break;
      case 'subcategory':
        if (!value) return '请选择子分类';
        break;
    }
    return '';
  };

  const handleInputChange = (field: string, value: string) => {
    // 对于category和subcategory字段，需要转换为number类型
    const processedValue = (field === 'category' || field === 'subcategory') 
      ? parseInt(value) || 0 
      : value;
    
    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));
    
    // 实时验证
    const error = validateField(field, value);
    setFieldErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleOfficialLinkChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      officialLinks: {
        ...prev.officialLinks,
        [field]: value
      }
    }));
    
    // 验证官方链接
    const urlPattern = /^https?:\/\/.+\..+/;
    let error = '';
    if (value && !urlPattern.test(value)) {
      const linkNames: { [key: string]: string } = {
        website: '官方网站',
        whitepaper: '白皮书',
        twitter: 'Twitter',
        telegram: 'Telegram',
        discord: 'Discord',
        github: 'GitHub',
        medium: 'Medium'
      };
      error = `请输入有效的${linkNames[field]}链接（需要包含http://或https://）`;
    }
    
    setFieldErrors(prev => ({
      ...prev,
      [`officialLinks.${field}`]: error
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const toggleChain = (chain: string) => {
    setFormData(prev => ({
      ...prev,
      chains: prev.chains.includes(chain)
        ? prev.chains.filter(c => c !== chain)
        : [...prev.chains, chain]
    }));
  };

  const validateForm = () => {
    // 验证必填字段
    const required = ['name', 'description', 'category', 'subcategory', 'url'];
    for (const field of required) {
      if (!formData[field as keyof ProjectSubmissionData]) {
        return `请填写${field === 'name' ? '项目名称' : 
                       field === 'description' ? '项目描述' :
                       field === 'category' ? '项目分类' :
                       field === 'subcategory' ? '子分类' :
                       field === 'url' ? '项目网址' : field}`;
      }
    }

    // 验证项目名称长度
    if (formData.name.length < 2 || formData.name.length > 50) {
      return '项目名称长度应在2-50个字符之间';
    }

    // 验证项目描述长度
    if (formData.description.length < 10 || formData.description.length > 200) {
      return '项目描述长度应在10-200个字符之间';
    }

    // 验证详细描述长度（如果填写）
    if (formData.detailedDescription && formData.detailedDescription.length > 1000) {
      return '详细描述不能超过1000个字符';
    }

    // 验证URL格式
    const urlPattern = /^https?:\/\/.+\..+/;
    if (!urlPattern.test(formData.url)) {
      return '请输入有效的项目网址（需要包含http://或https://）';
    }

    // 验证Logo URL格式（如果填写）
    if (formData.logo && !urlPattern.test(formData.logo)) {
      return '请输入有效的Logo网址（需要包含http://或https://）';
    }

    // 验证官方链接格式
    const officialLinksToValidate = ['website', 'whitepaper', 'twitter', 'telegram', 'discord', 'github', 'medium'];
    for (const linkType of officialLinksToValidate) {
      const linkValue = formData.officialLinks[linkType as keyof typeof formData.officialLinks];
      if (linkValue && !urlPattern.test(linkValue)) {
        const linkNames: { [key: string]: string } = {
          website: '官方网站',
          whitepaper: '白皮书',
          twitter: 'Twitter',
          telegram: 'Telegram',
          discord: 'Discord',
          github: 'GitHub',
          medium: 'Medium'
        };
        return `请输入有效的${linkNames[linkType]}链接（需要包含http://或https://）`;
      }
    }

    // 验证区块链选择
    if (formData.chains.length === 0) {
      return '请至少选择一个支持的区块链';
    }

    // 验证标签
    if (formData.tags.length === 0) {
      return '请至少添加一个标签';
    }

    if (formData.tags.length > 10) {
      return '标签数量不能超过10个';
    }

    // 验证标签长度
    for (const tag of formData.tags) {
      if (tag.length > 20) {
        return '单个标签长度不能超过20个字符';
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setSubmitMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/projects/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('项目提交成功！您的项目已添加到平台中。');
        // 重置表单
        setFormData({
          name: '',
          description: '',
          detailedDescription: '',
          category: 0,
          subcategory: 0,
          url: '',
          logo: '',
          tags: [],
          chains: [],
          officialLinks: {
            website: '',
            whitepaper: '',
            twitter: '',
            telegram: '',
            discord: '',
            github: '',
            medium: ''
          }
        });
      } else {
        const error = await response.json();
        setSubmitMessage(error.message || '提交失败，请稍后重试');
      }
    } catch (error) {
      setSubmitMessage('提交失败，请检查网络连接');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">提交新项目</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              项目名称 * <span className="text-xs text-gray-500">(2-50个字符)</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                fieldErrors.name 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="输入项目名称"
            />
            {fieldErrors.name && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              项目网址 *
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                fieldErrors.url 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="https://example.com"
            />
            {fieldErrors.url && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.url}</p>
            )}
          </div>
        </div>

        {/* 项目描述 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            项目简介 * <span className="text-xs text-gray-500">(10-200个字符)</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              fieldErrors.description 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="简要描述项目的主要功能和特点"
          />
          <div className="flex justify-between items-center mt-1">
            {fieldErrors.description && (
              <p className="text-sm text-red-600">{fieldErrors.description}</p>
            )}
            <span className="text-xs text-gray-500 ml-auto">
              {formData.description.length}/200
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            详细描述 <span className="text-xs text-gray-500">(可选，最多1000个字符)</span>
          </label>
          <textarea
            value={formData.detailedDescription}
            onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
            rows={6}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              fieldErrors.detailedDescription 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="详细描述项目的技术特点、应用场景、发展历程等"
          />
          <div className="flex justify-between items-center mt-1">
            {fieldErrors.detailedDescription && (
              <p className="text-sm text-red-600">{fieldErrors.detailedDescription}</p>
            )}
            <span className="text-xs text-gray-500 ml-auto">
              {formData.detailedDescription.length}/1000
            </span>
          </div>
        </div>

        {/* 分类选择 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              项目分类 *
            </label>
            <select
              value={formData.category}
              onChange={(e) => {
                handleInputChange('category', e.target.value);
                handleInputChange('subcategory', '0'); // 重置子分类
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoadingCategories}
            >
              <option value="0">{isLoadingCategories ? '加载中...' : '选择分类'}</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              子分类 *
            </label>
            <select
              value={formData.subcategory}
              onChange={(e) => handleInputChange('subcategory', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedCategory}
            >
              <option value="0">选择子分类</option>
              {selectedCategory?.subcategories?.map(subcategory => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Logo URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo URL
          </label>
          <input
            type="url"
            value={formData.logo}
            onChange={(e) => handleInputChange('logo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/logo.png"
          />
        </div>

        {/* 支持的区块链 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            支持的区块链 * <span className="text-xs text-gray-500">(至少选择一个)</span>
          </label>
          {isLoadingChains ? (
            <div className="text-sm text-gray-500">加载区块链数据中...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {availableChains.map(chain => (
                <label key={chain.symbol} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.chains.includes(chain.name)}
                    onChange={() => toggleChain(chain.name)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {chain.name}
                  </span>
                </label>
              ))}
            </div>
          )}
          {formData.chains.length === 0 && (
            <p className="text-sm text-red-600 mt-2">请至少选择一个支持的区块链</p>
          )}
        </div>

        {/* 标签 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            项目标签 * <span className="text-xs text-gray-500">(1-10个标签，每个标签最多20个字符)</span>
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入标签后按回车添加"
              maxLength={20}
            />
            <button
              type="button"
              onClick={addTag}
              disabled={!tagInput.trim() || formData.tags.length >= 10 || tagInput.length > 20}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              添加
            </button>
          </div>
          {formData.tags.length === 0 && (
            <p className="text-sm text-red-600 mb-2">请至少添加一个标签</p>
          )}
          {formData.tags.length >= 10 && (
            <p className="text-sm text-orange-600 mb-2">最多只能添加10个标签</p>
          )}
          <div className="flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 官方链接 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">官方链接</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                官网
              </label>
              <input
                type="url"
                value={formData.officialLinks.website}
                onChange={(e) => handleOfficialLinkChange('website', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                白皮书
              </label>
              <input
                type="url"
                value={formData.officialLinks.whitepaper}
                onChange={(e) => handleOfficialLinkChange('whitepaper', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/whitepaper.pdf"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter
              </label>
              <input
                type="url"
                value={formData.officialLinks.twitter}
                onChange={(e) => handleOfficialLinkChange('twitter', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://twitter.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telegram
              </label>
              <input
                type="url"
                value={formData.officialLinks.telegram}
                onChange={(e) => handleOfficialLinkChange('telegram', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://t.me/channel"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discord
              </label>
              <input
                type="url"
                value={formData.officialLinks.discord}
                onChange={(e) => handleOfficialLinkChange('discord', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://discord.gg/invite"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub
              </label>
              <input
                type="url"
                value={formData.officialLinks.github}
                onChange={(e) => handleOfficialLinkChange('github', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medium/Blog
              </label>
              <input
                type="url"
                value={formData.officialLinks.medium}
                onChange={(e) => handleOfficialLinkChange('medium', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://medium.com/@username"
              />
            </div>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '提交中...' : '提交项目'}
          </button>
        </div>

        {/* 提交消息 */}
        {submitMessage && (
          <div className={`p-4 rounded-md ${
            submitMessage.includes('成功') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  );
}