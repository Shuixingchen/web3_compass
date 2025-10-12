-- Web3 Compass 简化数据库设计
-- 创建时间: 2024-01-17
-- 版本: 2.0 (简化版)

-- 设置字符集
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ================================
-- 1. 用户表 (users) - 简化版
-- ================================
DROP TABLE IF EXISTS `web3_users`;
CREATE TABLE `web3_users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `email` varchar(255) NOT NULL COMMENT '邮箱地址',
  `name` varchar(100) NOT NULL COMMENT '用户名称',
  `avatar_url` varchar(500) DEFAULT NULL COMMENT '头像URL',
  `provider` enum('google', 'github') NOT NULL COMMENT '登录提供商',
  `provider_id` varchar(100) NOT NULL COMMENT '第三方平台用户ID',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_email` (`email`),
  UNIQUE KEY `uk_users_provider` (`provider`, `provider_id`),
  KEY `idx_users_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- ================================
-- 2. 分类表 (categories) - 简化版
-- ================================
DROP TABLE IF EXISTS `web3_categories`;
CREATE TABLE `web3_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(100) NOT NULL COMMENT '分类名称',
  `slug` varchar(100) NOT NULL COMMENT '分类标识符',
  `icon` varchar(100) NOT NULL COMMENT '分类图标',
  `parent_id` bigint(20) unsigned DEFAULT NULL COMMENT '父分类ID',
  `sort_order` int(11) NOT NULL DEFAULT 0 COMMENT '排序顺序',
  `project_count` int(11) NOT NULL DEFAULT 0 COMMENT '项目数量',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_categories_slug` (`slug`),
  KEY `idx_categories_parent_id` (`parent_id`),
  KEY `idx_categories_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='分类表';

-- ================================
-- 3. 项目表 (projects) - 简化版
-- ================================
DROP TABLE IF EXISTS `web3_projects`;
CREATE TABLE `web3_projects` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '项目ID',
  `name` varchar(200) NOT NULL COMMENT '项目名称',
  `description` text NOT NULL COMMENT '项目简介',
  `detailed_description` longtext DEFAULT NULL COMMENT '详细介绍',
  `category` varchar(50) NOT NULL COMMENT '主分类',
  `subcategory` varchar(50) DEFAULT NULL COMMENT '子分类',
  `url` varchar(500) NOT NULL COMMENT '官方网站',
  `logo` varchar(500) DEFAULT NULL COMMENT 'Logo URL',
  `view_count` int(11) NOT NULL DEFAULT 0 COMMENT '浏览次数',
  `tags` json DEFAULT NULL COMMENT '项目标签数组',
  `chains` json DEFAULT NULL COMMENT '项目所属的区块链数组',
  `official_links` json DEFAULT NULL COMMENT '官方链接',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_projects_category` (`category`),
  KEY `idx_projects_subcategory` (`subcategory`),
  KEY `idx_projects_view_count` (`view_count`),
  KEY `idx_projects_created_at` (`created_at`),
  FULLTEXT KEY `ft_projects_search` (`name`, `description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='项目表';

-- ================================
-- 4. 标签表 (tags) - 供用户选择的标签库
-- ================================
DROP TABLE IF EXISTS `web3_tags`;
CREATE TABLE `web3_tags` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '标签ID',
  `name` varchar(50) NOT NULL COMMENT '标签名称',
  `category` varchar(50) DEFAULT NULL COMMENT '标签分类',
  `description` varchar(200) DEFAULT NULL COMMENT '标签描述',
  `color` varchar(7) DEFAULT '#3B82F6' COMMENT '标签颜色',
  `usage_count` int(11) NOT NULL DEFAULT 0 COMMENT '使用次数',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_tags_name` (`name`),
  KEY `idx_tags_category` (`category`),
  KEY `idx_tags_usage_count` (`usage_count`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='标签表';

-- ================================
-- 5. 新闻表 (news) - 简化版
-- ================================
DROP TABLE IF EXISTS `web3_news`;
CREATE TABLE `web3_news` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '新闻ID',
  `title` varchar(500) NOT NULL COMMENT '新闻标题',
  `summary` text NOT NULL COMMENT '新闻摘要',
  `url` varchar(500) NOT NULL COMMENT '原文链接',
  `source` varchar(100) DEFAULT NULL COMMENT '来源名称',
  `project_id` bigint(20) unsigned DEFAULT NULL COMMENT '关联项目ID',
  `published_at` timestamp NOT NULL COMMENT '发布时间',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_news_project_id` (`project_id`),
  KEY `idx_news_published_at` (`published_at`),
  KEY `idx_news_created_at` (`created_at`),
  FULLTEXT KEY `ft_news_search` (`title`, `summary`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='新闻表';

-- ================================
-- 6. 用户收藏表 (user_bookmarks) - 简化版
-- ================================
DROP TABLE IF EXISTS `web3_user_bookmarks`;
CREATE TABLE `web3_user_bookmarks` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '收藏ID',
  `user_id` bigint(20) unsigned NOT NULL COMMENT '用户ID',
  `project_id` bigint(20) unsigned NOT NULL COMMENT '项目ID',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_bookmarks` (`user_id`, `project_id`),
  KEY `idx_user_bookmarks_user_id` (`user_id`),
  KEY `idx_user_bookmarks_project_id` (`project_id`),
  KEY `idx_user_bookmarks_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户收藏表';

-- ================================
-- 初始化数据
-- ================================
