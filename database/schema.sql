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

-- 插入分类数据
INSERT INTO `web3_categories` (`name`, `slug`, `icon`, `sort_order`, `project_count`) VALUES
('DeFi', 'defi', '💰', 1, 0),
('NFT', 'nft', '🎨', 2, 0),
('基础设施', 'infrastructure', '🔧', 3, 0),
('DAO', 'dao', '🏛️', 4, 0),
('开发工具', 'tools', '⚡', 5, 0);

-- 插入子分类数据
INSERT INTO `web3_categories` (`name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
('DEX', 'dex', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'defi') AS temp), 1, 0),
('借贷', 'lending', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'defi') AS temp), 2, 0),
('收益农场', 'yield', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'defi') AS temp), 3, 0),
('衍生品', 'derivatives', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'defi') AS temp), 4, 0),
('市场', 'marketplace', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'nft') AS temp), 1, 0),
('游戏', 'gaming', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'nft') AS temp), 2, 0),
('艺术', 'art', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'nft') AS temp), 3, 0),
('实用工具', 'utility', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'nft') AS temp), 4, 0),
('区块链', 'blockchain', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'infrastructure') AS temp), 1, 0),
('钱包', 'wallet', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'infrastructure') AS temp), 2, 0),
('跨链桥', 'bridge', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'infrastructure') AS temp), 3, 0),
('预言机', 'oracle', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'infrastructure') AS temp), 4, 0),
('治理', 'governance', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'dao') AS temp), 1, 0),
('投资', 'investment', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'dao') AS temp), 2, 0),
('社交', 'social', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'dao') AS temp), 3, 0),
('分析工具', 'analytics', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'tools') AS temp), 1, 0),
('安全工具', 'security', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'tools') AS temp), 2, 0),
('开发框架', 'development', '', (SELECT id FROM (SELECT id FROM web3_categories WHERE slug = 'tools') AS temp), 3, 0);

-- ================================
-- 插入用户数据
-- ================================
INSERT INTO `web3_users` (`email`, `name`, `avatar_url`, `provider`, `provider_id`) VALUES
('alice@example.com', 'Alice Chen', 'https://avatars.githubusercontent.com/u/1?v=4', 'github', 'alice123'),
('bob@example.com', 'Bob Wang', 'https://avatars.githubusercontent.com/u/2?v=4', 'google', 'bob456'),
('charlie@example.com', 'Charlie Li', 'https://avatars.githubusercontent.com/u/3?v=4', 'github', 'charlie789'),
('diana@example.com', 'Diana Zhang', 'https://avatars.githubusercontent.com/u/4?v=4', 'google', 'diana101'),
('eve@example.com', 'Eve Liu', 'https://avatars.githubusercontent.com/u/5?v=4', 'github', 'eve202');

-- ================================
-- 插入项目数据
-- ================================
INSERT INTO `web3_projects` (`name`, `description`, `detailed_description`, `category`, `subcategory`, `url`, `logo`, `featured`, `tags`, `official_links`) VALUES
-- DeFi 项目
('Uniswap', '去中心化交易协议，支持自动化做市商(AMM)模式', 'Uniswap是以太坊上最大的去中心化交易所，采用自动化做市商(AMM)模式，允许用户在没有传统订单簿的情况下交易代币。它通过流动性池和恒定乘积公式来确定价格，为DeFi生态系统提供了重要的基础设施。', 'DeFi', 'DEX', 'https://uniswap.org', 'https://cryptologos.cc/logos/uniswap-uni-logo.png', 1, '["AMM", "DEX", "Ethereum", "DeFi", "Liquidity"]', '{"website": "https://uniswap.org", "twitter": "https://twitter.com/Uniswap", "github": "https://github.com/Uniswap", "discord": "https://discord.gg/FCfyBSbCU5"}'),

('Aave', '开源的去中心化借贷协议', 'Aave是一个开源的去中心化借贷协议，用户可以存入资产赚取利息，或者抵押资产借出其他代币。它支持多种创新功能，如闪电贷、利率切换等，是DeFi借贷领域的领导者。', 'DeFi', '借贷', 'https://aave.com', 'https://cryptologos.cc/logos/aave-aave-logo.png', 1, '["Lending", "Borrowing", "Flash Loans", "DeFi", "Ethereum"]', '{"website": "https://aave.com", "twitter": "https://twitter.com/AaveAave", "github": "https://github.com/aave", "discord": "https://discord.gg/CvKUrqM"}'),

('Compound', '算法货币市场协议', 'Compound是一个算法货币市场协议，允许用户借贷加密货币。利率由算法根据供需关系自动调整，为用户提供透明和高效的借贷服务。', 'DeFi', '借贷', 'https://compound.finance', 'https://cryptologos.cc/logos/compound-comp-logo.png', 0, '["Lending", "Algorithmic", "DeFi", "Ethereum"]', '{"website": "https://compound.finance", "twitter": "https://twitter.com/compoundfinance", "github": "https://github.com/compound-finance"}'),

('Yearn Finance', '收益聚合器协议', 'Yearn Finance是一个收益聚合器，自动为用户寻找最佳的DeFi收益策略。通过智能合约自动化投资组合管理，帮助用户最大化收益。', 'DeFi', '收益农场', 'https://yearn.finance', 'https://cryptologos.cc/logos/yearn-finance-yfi-logo.png', 1, '["Yield Farming", "Aggregator", "DeFi", "Automation"]', '{"website": "https://yearn.finance", "twitter": "https://twitter.com/yearnfi", "github": "https://github.com/yearn"}'),

-- NFT 项目
('OpenSea', '最大的NFT交易市场', 'OpenSea是世界上最大的NFT交易市场，支持多种区块链上的NFT交易。用户可以在这里买卖、发现和收集数字艺术品、游戏物品、域名等各种NFT。', 'NFT', '市场', 'https://opensea.io', 'https://opensea.io/static/images/logos/opensea-logo.svg', 1, '["NFT", "Marketplace", "Digital Art", "Collectibles"]', '{"website": "https://opensea.io", "twitter": "https://twitter.com/opensea", "discord": "https://discord.gg/opensea"}'),

('Axie Infinity', '基于NFT的游戏生态系统', 'Axie Infinity是一个基于区块链的游戏，玩家可以收集、繁殖和战斗名为Axie的数字宠物。游戏采用Play-to-Earn模式，玩家可以通过游戏赚取代币。', 'NFT', '游戏', 'https://axieinfinity.com', 'https://cryptologos.cc/logos/axie-infinity-axs-logo.png', 1, '["Gaming", "NFT", "Play-to-Earn", "Metaverse"]', '{"website": "https://axieinfinity.com", "twitter": "https://twitter.com/AxieInfinity", "discord": "https://discord.gg/axie"}'),

('Art Blocks', '生成艺术NFT平台', 'Art Blocks是一个专注于生成艺术的NFT平台，艺术家可以创建算法生成的艺术作品，每个NFT都是独一无二的艺术品。', 'NFT', '艺术', 'https://artblocks.io', 'https://artblocks.io/favicon.ico', 0, '["Generative Art", "NFT", "Digital Art", "Algorithm"]', '{"website": "https://artblocks.io", "twitter": "https://twitter.com/ArtBlocks_io"}'),

-- 基础设施项目
('MetaMask', '最受欢迎的以太坊钱包', 'MetaMask是一个浏览器扩展和移动应用钱包，允许用户与以太坊区块链交互。它是进入DeFi和Web3世界的主要入口之一。', '基础设施', '钱包', 'https://metamask.io', 'https://cryptologos.cc/logos/metamask-logo.png', 1, '["Wallet", "Browser Extension", "Ethereum", "Web3"]', '{"website": "https://metamask.io", "twitter": "https://twitter.com/MetaMask", "github": "https://github.com/MetaMask"}'),

('Chainlink', '去中心化预言机网络', 'Chainlink是一个去中心化的预言机网络，为智能合约提供可靠的外部数据。它连接区块链与现实世界的数据，是DeFi生态系统的重要基础设施。', '基础设施', '预言机', 'https://chain.link', 'https://cryptologos.cc/logos/chainlink-link-logo.png', 1, '["Oracle", "Data Feeds", "Smart Contracts", "Infrastructure"]', '{"website": "https://chain.link", "twitter": "https://twitter.com/chainlink", "github": "https://github.com/smartcontractkit"}'),

('Polygon', '以太坊扩容解决方案', 'Polygon是一个多链扩容解决方案，为以太坊提供更快、更便宜的交易。它支持多种扩容技术，包括侧链、Plasma和zk-rollups。', '基础设施', '区块链', 'https://polygon.technology', 'https://cryptologos.cc/logos/polygon-matic-logo.png', 1, '["Layer 2", "Scaling", "Ethereum", "Sidechain"]', '{"website": "https://polygon.technology", "twitter": "https://twitter.com/0xPolygon", "github": "https://github.com/maticnetwork"}'),

-- DAO 项目
('MakerDAO', '去中心化自治组织，管理DAI稳定币', 'MakerDAO是一个去中心化自治组织，负责管理DAI稳定币系统。持有MKR代币的用户可以参与治理决策，包括风险参数、抵押品类型等。', 'DAO', '治理', 'https://makerdao.com', 'https://cryptologos.cc/logos/maker-mkr-logo.png', 1, '["DAO", "Stablecoin", "Governance", "DeFi"]', '{"website": "https://makerdao.com", "twitter": "https://twitter.com/MakerDAO", "github": "https://github.com/makerdao"}'),

('Gitcoin', '开源项目资助平台', 'Gitcoin是一个支持开源项目的平台，通过二次方资助等创新机制为开源开发者提供资金支持。它促进了Web3生态系统的发展。', 'DAO', '投资', 'https://gitcoin.co', 'https://gitcoin.co/static/v2/images/favicon.ico', 0, '["Open Source", "Funding", "Grants", "Community"]', '{"website": "https://gitcoin.co", "twitter": "https://twitter.com/gitcoin", "github": "https://github.com/gitcoinco"}'),

-- 开发工具项目
('Etherscan', '以太坊区块链浏览器', 'Etherscan是最受欢迎的以太坊区块链浏览器，提供交易查询、合约验证、代币信息等服务。它是开发者和用户了解以太坊网络状态的重要工具。', '开发工具', '分析工具', 'https://etherscan.io', 'https://etherscan.io/images/favicon3.ico', 1, '["Block Explorer", "Analytics", "Ethereum", "Developer Tools"]', '{"website": "https://etherscan.io", "twitter": "https://twitter.com/etherscan"}'),

('Hardhat', '以太坊开发环境', 'Hardhat是一个专业的以太坊开发环境，提供编译、部署、测试和调试智能合约的完整工具链。它是最受欢迎的以太坊开发框架之一。', '开发工具', '开发框架', 'https://hardhat.org', 'https://hardhat.org/favicon.ico', 0, '["Development", "Smart Contracts", "Testing", "Ethereum"]', '{"website": "https://hardhat.org", "twitter": "https://twitter.com/HardhatHQ", "github": "https://github.com/NomicFoundation/hardhat"}');

-- ================================
-- 插入标签数据
-- ================================
INSERT INTO `web3_tags` (`name`, `category`, `description`, `color`, `usage_count`) VALUES
-- DeFi 相关标签
('DeFi', 'Finance', '去中心化金融相关项目', '#FF6B6B', 8),
('AMM', 'Finance', '自动化做市商机制', '#4ECDC4', 1),
('DEX', 'Finance', '去中心化交易所', '#45B7D1', 1),
('Lending', 'Finance', '借贷协议', '#96CEB4', 2),
('Borrowing', 'Finance', '借款功能', '#FFEAA7', 1),
('Flash Loans', 'Finance', '闪电贷功能', '#DDA0DD', 1),
('Yield Farming', 'Finance', '收益农场', '#98D8C8', 1),
('Aggregator', 'Finance', '聚合器协议', '#F7DC6F', 1),
('Stablecoin', 'Finance', '稳定币', '#AED6F1', 1),

-- NFT 相关标签
('NFT', 'Digital Assets', '非同质化代币', '#FF9FF3', 4),
('Marketplace', 'Platform', '交易市场', '#54A0FF', 1),
('Digital Art', 'Art', '数字艺术', '#5F27CD', 2),
('Collectibles', 'Assets', '收藏品', '#00D2D3', 1),
('Gaming', 'Entertainment', '游戏相关', '#FF9F43', 1),
('Play-to-Earn', 'Gaming', '边玩边赚模式', '#10AC84', 1),
('Metaverse', 'Virtual World', '元宇宙', '#EE5A24', 1),
('Generative Art', 'Art', '生成艺术', '#9C88FF', 1),

-- 基础设施标签
('Ethereum', 'Blockchain', '以太坊生态系统', '#627EEA', 7),
('Layer 2', 'Infrastructure', '二层扩容解决方案', '#8395A7', 1),
('Scaling', 'Infrastructure', '扩容技术', '#2F3542', 1),
('Sidechain', 'Infrastructure', '侧链技术', '#57606F', 1),
('Wallet', 'Tools', '数字钱包', '#2ED573', 1),
('Browser Extension', 'Tools', '浏览器扩展', '#FFA502', 1),
('Web3', 'Technology', 'Web3技术', '#3742FA', 1),
('Oracle', 'Infrastructure', '预言机服务', '#FF6348', 1),
('Data Feeds', 'Infrastructure', '数据源', '#2F3542', 1),
('Smart Contracts', 'Technology', '智能合约', '#70A1FF', 2),
('Infrastructure', 'Technology', '基础设施', '#5352ED', 1),

-- DAO 相关标签
('DAO', 'Governance', '去中心化自治组织', '#FF3838', 1),
('Governance', 'Management', '治理机制', '#FF9500', 1),
('Open Source', 'Development', '开源项目', '#2ECC71', 1),
('Funding', 'Finance', '资金支持', '#3498DB', 1),
('Grants', 'Finance', '资助计划', '#9B59B6', 1),
('Community', 'Social', '社区驱动', '#E67E22', 1),

-- 开发工具标签
('Block Explorer', 'Tools', '区块链浏览器', '#1ABC9C', 1),
('Analytics', 'Tools', '数据分析工具', '#34495E', 1),
('Developer Tools', 'Development', '开发者工具', '#E74C3C', 1),
('Development', 'Programming', '开发相关', '#F39C12', 1),
('Testing', 'Development', '测试工具', '#8E44AD', 1),

-- 技术特性标签
('Liquidity', 'Finance', '流动性相关', '#16A085', 1),
('Algorithmic', 'Technology', '算法驱动', '#27AE60', 1),
('Automation', 'Technology', '自动化功能', '#2980B9', 1),
('Algorithm', 'Technology', '算法技术', '#8E44AD', 1);

-- ================================
-- 插入新闻数据
-- ================================
INSERT INTO `web3_news` (`title`, `summary`, `url`, `source`, `project_id`, `published_at`) VALUES
-- Uniswap 相关新闻
('Uniswap V4发布重大更新，引入Hooks功能', 'Uniswap宣布V4版本的重大更新，引入了Hooks功能，允许开发者在交易过程中添加自定义逻辑，为DeFi创新提供更多可能性。', 'https://uniswap.org/blog/uniswap-v4-hooks', 'Uniswap Blog', 1, '2024-01-15 10:00:00'),
('Uniswap日交易量突破20亿美元创历史新高', 'Uniswap协议日交易量达到20亿美元，创下历史新高，显示了去中心化交易所的强劲增长势头。', 'https://uniswap.org/blog/volume-record', 'DeFi Pulse', 1, '2024-01-10 14:30:00'),

-- Aave 相关新闻
('Aave V3在Arbitrum上正式启动', 'Aave V3协议在Arbitrum网络上正式启动，为用户提供更低成本的借贷服务，支持跨链功能。', 'https://aave.com/news/aave-v3-arbitrum', 'Aave News', 2, '2024-01-12 09:15:00'),
('Aave推出GHO稳定币测试版', 'Aave宣布推出其原生稳定币GHO的测试版，用户可以通过抵押资产铸造GHO，为DeFi生态系统增加新的稳定币选择。', 'https://aave.com/news/gho-stablecoin', 'CoinDesk', 2, '2024-01-08 16:45:00'),

-- OpenSea 相关新闻
('OpenSea推出OpenSea Pro专业交易平台', 'OpenSea发布专业版交易平台OpenSea Pro，提供高级交易工具和更低的手续费，面向专业NFT交易者。', 'https://opensea.io/blog/opensea-pro-launch', 'OpenSea Blog', 5, '2024-01-14 11:20:00'),
('OpenSea支持Solana NFT交易', 'OpenSea宣布支持Solana区块链上的NFT交易，扩大其多链NFT市场的覆盖范围。', 'https://opensea.io/blog/solana-support', 'The Block', 5, '2024-01-09 13:00:00'),

-- MetaMask 相关新闻
('MetaMask推出Snaps插件系统', 'MetaMask发布Snaps插件系统，允许第三方开发者为MetaMask添加新功能，扩展钱包的能力。', 'https://metamask.io/news/snaps-launch', 'MetaMask Blog', 8, '2024-01-13 15:30:00'),
('MetaMask月活用户突破3000万', 'MetaMask宣布其月活跃用户数突破3000万，成为Web3领域最受欢迎的钱包应用。', 'https://metamask.io/news/30m-users', 'Decrypt', 8, '2024-01-07 10:45:00'),

-- Chainlink 相关新闻
('Chainlink推出跨链互操作性协议CCIP', 'Chainlink发布跨链互操作性协议CCIP，为不同区块链之间的安全通信提供标准化解决方案。', 'https://chain.link/news/ccip-launch', 'Chainlink Blog', 9, '2024-01-11 12:00:00'),
('Chainlink价格预言机集成到100+区块链', 'Chainlink宣布其价格预言机已集成到超过100个区块链网络，为DeFi生态系统提供可靠的价格数据。', 'https://chain.link/news/100-blockchains', 'CoinTelegraph', 9, '2024-01-06 14:15:00'),

-- 通用Web3新闻
('以太坊2024年路线图发布，专注于扩容和安全性', '以太坊基金会发布2024年技术路线图，重点关注Layer 2扩容解决方案和网络安全性提升。', 'https://ethereum.org/roadmap-2024', 'Ethereum Foundation', NULL, '2024-01-16 09:00:00'),
('DeFi总锁仓价值突破1000亿美元', 'DeFi协议的总锁仓价值(TVL)再次突破1000亿美元大关，显示了去中心化金融的强劲复苏。', 'https://defipulse.com/tvl-1000b', 'DeFi Pulse', NULL, '2024-01-05 16:30:00'),
('NFT市场2024年展望：实用性和游戏化成为趋势', '分析师预测2024年NFT市场将更加注重实用性和游戏化应用，而非纯粹的投机交易。', 'https://nftanalysis.com/2024-outlook', 'NFT Analysis', NULL, '2024-01-04 11:00:00');

-- ================================
-- 插入用户收藏数据
-- ================================
INSERT INTO `web3_user_bookmarks` (`user_id`, `project_id`) VALUES
-- Alice 的收藏
(1, 1), -- Uniswap
(1, 2), -- Aave
(1, 8), -- MetaMask
(1, 9), -- Chainlink

-- Bob 的收藏
(2, 5), -- OpenSea
(2, 6), -- Axie Infinity
(2, 7), -- Art Blocks

-- Charlie 的收藏
(3, 1), -- Uniswap
(3, 4), -- Yearn Finance
(3, 10), -- Polygon
(3, 13), -- Etherscan
(3, 14), -- Hardhat

-- Diana 的收藏
(4, 2), -- Aave
(4, 3), -- Compound
(4, 11), -- MakerDAO

-- Eve 的收藏
(5, 8), -- MetaMask
(5, 12), -- Gitcoin
(5, 13); -- Etherscan

-- 重置外键检查
SET FOREIGN_KEY_CHECKS = 1;
