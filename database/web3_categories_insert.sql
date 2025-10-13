-- Web3 Compass 分类数据插入语句
-- 创建时间: 2024-01-17
-- 优化版本 - 参考 runtoweb3.com 的实用性分类体系
-- 更注重用户实际需求和功能导向

-- 清空现有数据
DELETE FROM `web3_categories`;

-- ================================
-- 一级分类插入 (parent_id = NULL)
-- 参考 runtoweb3.com 的分类逻辑，按用户需求和功能分类
-- ================================

-- 1. 交易 & DeFi（核心金融功能）
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(1, '交易 & DeFi', 'trading-defi', '💰', NULL, 1, 0);

-- 2. NFT & 数字收藏品
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(2, 'NFT & 数字收藏品', 'nft-collectibles', '🎨', NULL, 2, 0);

-- 3. 游戏 & 元宇宙
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(3, '游戏 & 元宇宙', 'gaming', '🎮', NULL, 3, 0);

-- 4. 数据 & 分析工具
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(4, '数据 & 分析工具', 'data-analytics', '📊', NULL, 4, 0);

-- 5. 钱包 & 安全
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(5, '钱包 & 安全', 'wallet-security', '🔐', NULL, 5, 0);

-- 6. 基础设施 & 开发
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(6, '基础设施 & 开发', 'infrastructure-dev', '🏗️', NULL, 6, 0);

-- 7. 媒体 & 资讯
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(7, '媒体 & 资讯', 'media-news', '📰', NULL, 7, 0);

-- 8. 教育 & 学习
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(8, '教育 & 学习', 'education', '📚', NULL, 8, 0);

-- 9. 社交 & 社区
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(9, '社交 & 社区', 'social-community', '👥', NULL, 9, 0);

-- 10. 投资 & 融资
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(10, '投资 & 融资', 'investment', '💼', NULL, 10, 0);

-- 11. 工具 & 实用程序
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(11, '工具 & 实用程序', 'tools-utilities', '🛠️', NULL, 11, 0);

-- 12. 招聘 & 职业
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(12, '招聘 & 职业', 'jobs-career', '💼', NULL, 12, 0);

-- ================================
-- 二级分类插入 (parent_id 指向对应的一级分类)
-- 基于 runtoweb3.com 的实用性分类设计
-- ================================

-- 交易 & DeFi 子分类 (parent_id = 1)
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(101, '去中心化交易所 (DEX)', 'dex', '🔄', 1, 1, 0),
(102, '借贷平台', 'lending', '🏦', 1, 2, 0),
(103, '流动性挖矿', 'yield-farming', '🌾', 1, 3, 0),
(104, '稳定币', 'stablecoin', '💵', 1, 4, 0),
(105, '交易聚合器', 'aggregator', '🔀', 1, 5, 0),
(106, '跨链工具', 'cross-chain', '🌉', 1, 6, 0),
(107, '衍生品交易', 'derivatives', '📈', 1, 7, 0),
(108, '资产管理', 'asset-management', '💼', 1, 8, 0);

-- NFT & 数字收藏品 子分类 (parent_id = 2)
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(201, 'NFT 交易市场', 'nft-marketplace', '🛒', 2, 1, 0),
(202, 'NFT 创作平台', 'nft-creation', '🎨', 2, 2, 0),
(203, 'NFT 聚合器', 'nft-aggregator', '🔄', 2, 3, 0),
(204, '数字艺术平台', 'digital-art', '🖼️', 2, 4, 0),
(205, '音乐 & 娱乐 NFT', 'music-entertainment', '🎵', 2, 5, 0),
(206, '体育 & 收藏卡', 'sports-cards', '⚽', 2, 6, 0),
(207, 'NFT 金融化', 'nft-fi', '💎', 2, 7, 0);

-- 游戏 & 元宇宙 子分类 (parent_id = 3)
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(301, '区块链游戏', 'blockchain-games', '🎯', 3, 1, 0),
(302, '元宇宙平台', 'metaverse-platform', '🌐', 3, 2, 0),
(303, 'GameFi 协议', 'gamefi-protocol', '🎲', 3, 3, 0),
(304, '游戏公会 & DAO', 'gaming-guild', '🏰', 3, 4, 0),
(305, '游戏资产交易', 'gaming-assets', '⚔️', 3, 5, 0),
(306, 'VR/AR 应用', 'vr-ar', '🥽', 3, 6, 0);

-- 数据 & 分析工具 子分类 (parent_id = 4)
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(401, '链上数据分析', 'onchain-analytics', '🔍', 4, 1, 0),
(402, '代币 & 市场数据', 'market-data', '📊', 4, 2, 0),
(403, 'DeFi 数据平台', 'defi-data', '📈', 4, 3, 0),
(404, 'NFT 数据分析', 'nft-data', '🎨', 4, 4, 0),
(405, '投资组合追踪', 'portfolio-tracking', '💼', 4, 5, 0),
(406, '炒币指标工具', 'trading-indicators', '📉', 4, 6, 0),
(407, '研究 & 报告', 'research-report', '📋', 4, 7, 0);

-- 钱包 & 安全 子分类 (parent_id = 5)
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(501, '加密钱包', 'crypto-wallet', '👛', 5, 1, 0),
(502, '硬件钱包', 'hardware-wallet', '🔒', 5, 2, 0),
(503, '多签钱包', 'multisig-wallet', '🔐', 5, 3, 0),
(504, '安全审计', 'security-audit', '🛡️', 5, 4, 0),
(505, '风险检测', 'risk-detection', '⚠️', 5, 5, 0),
(506, '保险协议', 'insurance-protocol', '🛡️', 5, 6, 0),
(507, '隐私保护', 'privacy-protection', '🕶️', 5, 7, 0);

-- 基础设施 & 开发 子分类 (parent_id = 6)
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(601, '公链 & Layer1', 'blockchain', '⛓️', 6, 1, 0),
(602, 'Layer2 & 扩容', 'layer2', '⚡', 6, 2, 0),
(603, '存储 & 计算网络', 'storage-computing', '💾', 6, 3, 0),
(604, '预言机服务', 'oracle', '🔮', 6, 4, 0),
(605, '节点 & API 服务', 'node-api', '🖥️', 6, 5, 0),
(606, '开发工具 & 框架', 'dev-tools', '🛠️', 6, 6, 0),
(607, '身份 & 域名服务', 'identity-domain', '🆔', 6, 7, 0);

-- 媒体 & 资讯 子分类 (parent_id = 7)
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(701, '区块链媒体', 'blockchain-media', '📰', 7, 1, 0),
(702, '新闻聚合平台', 'news-aggregator', '📡', 7, 2, 0),
(703, '深度报道 & 分析', 'deep-analysis', '🔍', 7, 3, 0),
(704, '行业资讯', 'industry-news', '📊', 7, 4, 0),
(705, '项目评测', 'project-review', '⭐', 7, 5, 0);

-- 教育 & 学习 子分类 (parent_id = 8)
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(801, 'Web3 教程平台', 'web3-tutorial', '📚', 8, 1, 0),
(802, '区块链课程', 'blockchain-course', '🎓', 8, 2, 0),
(803, '开发者教育', 'developer-education', '💻', 8, 3, 0),
(804, '认证 & 考试', 'certification', '🏆', 8, 4, 0),
(805, '社区 & 论坛', 'community-forum', '👥', 8, 5, 0);

-- 社交 & 社区 子分类 (parent_id = 9)
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(901, '去中心化社交', 'decentralized-social', '🌐', 9, 1, 0),
(902, '内容创作平台', 'content-creation', '✍️', 9, 2, 0),
(903, '社交代币', 'social-token', '🪙', 9, 3, 0),
(904, 'DAO & 治理平台', 'dao-governance', '🏛️', 9, 4, 0),
(905, '社区工具', 'community-tools', '🔧', 9, 5, 0);

-- 投资 & 融资 子分类 (parent_id = 10)
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(1001, '项目孵化平台', 'incubator', '🚀', 10, 1, 0),
(1002, 'IDO & 众筹平台', 'ido-crowdfunding', '💰', 10, 2, 0),
(1003, '投资 DAO', 'investment-dao', '🏦', 10, 3, 0),
(1004, '风投 & 基金', 'vc-fund', '💼', 10, 4, 0),
(1005, '项目评级', 'project-rating', '⭐', 10, 5, 0);

-- 工具 & 实用程序 子分类 (parent_id = 11)
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(1101, '空投工具', 'airdrop-tools', '🎁', 11, 1, 0),
(1102, '多链工具', 'multichain-tools', '🔗', 11, 2, 0),
(1103, '税务 & 会计工具', 'tax-accounting', '📊', 11, 3, 0),
(1104, '批量操作工具', 'batch-tools', '⚙️', 11, 4, 0),
(1105, 'AI 工具', 'ai-tools', '🤖', 11, 5, 0),
(1106, '实用小工具', 'utility-tools', '🛠️', 11, 6, 0);

-- 招聘 & 职业 子分类 (parent_id = 12)
INSERT INTO `web3_categories` (`id`, `name`, `slug`, `icon`, `parent_id`, `sort_order`, `project_count`) VALUES
(1201, 'Web3 招聘平台', 'web3-jobs', '💼', 12, 1, 0),
(1202, '远程工作平台', 'remote-work', '🌍', 12, 2, 0),
(1203, '自由职业平台', 'freelance', '👨‍💻', 12, 3, 0),
(1204, '技能认证', 'skill-certification', '🏆', 12, 4, 0),
(1205, '职业发展', 'career-development', '📈', 12, 5, 0);

-- 重置自增ID
ALTER TABLE `web3_categories` AUTO_INCREMENT = 1300;