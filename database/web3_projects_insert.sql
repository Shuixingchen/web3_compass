-- Web3 Compass 项目数据插入语句
-- 创建时间: 2024-01-17
-- 基于 runtoweb3.com 和主流 Web3 项目数据
-- 与当前 web3_categories 分类体系保持一致

-- 清空现有数据
DELETE FROM `web3_projects`;

-- ================================
-- 1. 交易 & DeFi 项目
-- ================================

-- 去中心化交易所 (DEX)
INSERT INTO `web3_projects` (`name`, `description`, `detailed_description`, `category`, `subcategory`, `url`, `logo`, `view_count`, `tags`, `chains`, `official_links`) VALUES
('Uniswap', '最大的去中心化交易所，基于自动做市商(AMM)模型', 'Uniswap是以太坊上最大的去中心化交易所，采用自动做市商模型，允许用户无需订单簿即可交易ERC-20代币。支持多链部署，提供流动性挖矿和治理功能。', 1, 101, 'https://uniswap.org', 'https://uniswap.org/favicon.ico', 0, '["DEX", "AMM", "流动性挖矿", "治理代币"]', '["Ethereum", "Polygon", "Arbitrum", "Optimism"]', '{"twitter": "https://twitter.com/Uniswap", "discord": "https://discord.gg/FCfyBSbCU5", "github": "https://github.com/Uniswap"}'),

('PancakeSwap', 'BSC链上最大的去中心化交易所', 'PancakeSwap是币安智能链(BSC)上最大的DEX，提供代币交换、流动性挖矿、NFT市场等功能。以低手续费和高速交易著称。', 1, 101, 'https://pancakeswap.finance', 'https://pancakeswap.finance/favicon.ico', 0, '["DEX", "BSC", "流动性挖矿", "NFT"]', '["BSC", "Ethereum", "Aptos"]', '{"twitter": "https://twitter.com/pancakeswap", "telegram": "https://t.me/pancakeswap"}'),

('SushiSwap', '社区驱动的多链DEX平台', 'SushiSwap是一个社区驱动的去中心化交易所，支持多链部署，提供交易、借贷、期权等DeFi服务。', 1, 101, 'https://sushi.com', 'https://sushi.com/favicon.ico', 0, '["DEX", "多链", "社区治理", "DeFi"]', '["Ethereum", "Polygon", "Arbitrum", "Avalanche"]', '{"twitter": "https://twitter.com/sushiswap", "discord": "https://discord.gg/NVPXN4e"}'),

-- 借贷平台
('Aave', '领先的去中心化借贷协议', 'Aave是最大的去中心化借贷协议之一，支持多种加密资产的存款和借贷，提供固定和浮动利率选择。', 1, 102, 'https://aave.com', 'https://aave.com/favicon.ico', 0, '["借贷", "DeFi", "流动性", "治理"]', '["Ethereum", "Polygon", "Avalanche", "Arbitrum"]', '{"twitter": "https://twitter.com/aaveaave", "discord": "https://discord.gg/CvKUrqM"}'),

('Compound', '自动化利率协议', 'Compound是一个算法化的货币市场协议，允许用户赚取利息或借贷资产，利率由供需关系自动调节。', 1, 102, 'https://compound.finance', 'https://compound.finance/favicon.ico', 0, '["借贷", "算法利率", "DeFi", "治理"]', '["Ethereum"]', '{"twitter": "https://twitter.com/compoundfinance", "discord": "https://discord.gg/fq6JSPkpJn"}'),

-- 跨链工具
('Chainlink', '去中心化预言机网络', 'Chainlink是最大的去中心化预言机网络，为智能合约提供可靠的外部数据源，连接区块链与现实世界。', 1, 106, 'https://chain.link', 'https://chain.link/favicon.ico', 0, '["预言机", "数据源", "跨链", "基础设施"]', '["Ethereum", "Polygon", "BSC", "Avalanche"]', '{"twitter": "https://twitter.com/chainlink", "discord": "https://discord.gg/aSK4zew"}'),

-- ================================
-- 2. NFT & 数字收藏品 项目
-- ================================

-- NFT 交易市场
('OpenSea', '全球最大的NFT交易市场', 'OpenSea是全球最大的NFT交易平台，支持多链NFT交易，包括艺术品、收藏品、游戏道具等各类数字资产。', 2, 201, 'https://opensea.io', 'https://opensea.io/favicon.ico', 0, '["NFT", "交易市场", "多链", "数字收藏品"]', '["Ethereum", "Polygon", "Arbitrum", "Optimism", "Avalanche"]', '{"twitter": "https://twitter.com/opensea", "discord": "https://discord.gg/opensea"}'),

('Blur', '专业NFT交易平台', 'Blur是专为专业NFT交易者设计的平台，提供高级交易功能、实时数据分析和低手续费。', 2, 201, 'https://blur.io', 'https://blur.io/favicon.ico', 0, '["NFT", "专业交易", "数据分析", "低手续费"]', '["Ethereum"]', '{"twitter": "https://twitter.com/blur_io", "discord": "https://discord.gg/blur"}'),

-- NFT 聚合器
('Gem', 'NFT聚合交易平台', 'Gem是一个NFT聚合器，允许用户在一个平台上浏览和购买来自多个NFT市场的藏品。', 2, 203, 'https://gem.xyz', 'https://gem.xyz/favicon.ico', 0, '["NFT", "聚合器", "多市场", "批量购买"]', '["Ethereum"]', '{"twitter": "https://twitter.com/gemxyz"}'),

-- ================================
-- 3. 游戏 & 元宇宙 项目
-- ================================

-- 区块链游戏
('Axie Infinity', '领先的区块链游戏', 'Axie Infinity是最成功的区块链游戏之一，玩家可以收集、繁殖和战斗数字宠物Axie，并通过游戏赚取代币。', 3, 301, 'https://axieinfinity.com', 'https://axieinfinity.com/favicon.ico', 0, '["GameFi", "P2E", "NFT游戏", "数字宠物"]', '["Ronin", "Ethereum"]', '{"twitter": "https://twitter.com/axieinfinity", "discord": "https://discord.gg/axie"}'),

-- 元宇宙平台
('Decentraland', '虚拟世界平台', 'Decentraland是一个基于以太坊的虚拟世界平台，用户可以购买土地、建造场景、创建应用程序和体验。', 3, 302, 'https://decentraland.org', 'https://decentraland.org/favicon.ico', 0, '["元宇宙", "虚拟土地", "VR", "创作平台"]', '["Ethereum", "Polygon"]', '{"twitter": "https://twitter.com/decentraland", "discord": "https://discord.gg/9EcuFgC"}'),

('The Sandbox', '用户生成内容的游戏元宇宙', 'The Sandbox是一个去中心化的游戏元宇宙，玩家可以创建、拥有和货币化他们的游戏体验。', 3, 302, 'https://sandbox.game', 'https://sandbox.game/favicon.ico', 0, '["元宇宙", "UGC", "游戏创作", "虚拟土地"]', '["Ethereum", "Polygon"]', '{"twitter": "https://twitter.com/thesandboxgame", "discord": "https://discord.gg/vAe4zvY"}'),

-- ================================
-- 4. 数据 & 分析工具 项目
-- ================================

-- 链上数据分析
('Dune Analytics', '区块链数据分析平台', 'Dune Analytics是一个强大的区块链数据分析平台，允许用户创建和分享加密货币数据的可视化图表。', 4, 401, 'https://dune.com', 'https://dune.com/favicon.ico', 0, '["数据分析", "可视化", "SQL查询", "社区驱动"]', '["Ethereum", "Polygon", "BSC", "Solana"]', '{"twitter": "https://twitter.com/duneanalytics", "discord": "https://discord.gg/ErrzwBz"}'),

('Nansen', '链上数据智能平台', 'Nansen提供实时的链上数据分析，帮助用户追踪智能资金流向，发现投资机会。', 4, 401, 'https://nansen.ai', 'https://nansen.ai/favicon.ico', 0, '["数据分析", "智能资金", "实时追踪", "投资工具"]', '["Ethereum", "Polygon", "BSC", "Arbitrum"]', '{"twitter": "https://twitter.com/nansen_ai"}'),

-- 代币 & 市场数据
('CoinMarketCap', '加密货币市场数据平台', 'CoinMarketCap是全球领先的加密货币价格追踪网站，提供市值、价格、交易量等市场数据。', 4, 402, 'https://coinmarketcap.com', 'https://coinmarketcap.com/favicon.ico', 0, '["价格追踪", "市场数据", "排名", "新闻"]', '["多链支持"]', '{"twitter": "https://twitter.com/coinmarketcap"}'),

('CoinGecko', '加密货币数据分析网站', 'CoinGecko提供全面的加密货币市场信息和工具，包括价格、市值、开发者活动等数据。', 4, 402, 'https://coingecko.com', 'https://coingecko.com/favicon.ico', 0, '["市场数据", "价格分析", "开发者活动", "DeFi数据"]', '["多链支持"]', '{"twitter": "https://twitter.com/coingecko"}'),

-- ================================
-- 5. 钱包 & 安全 项目
-- ================================

-- 加密钱包
('MetaMask', '最受欢迎的以太坊钱包', 'MetaMask是最受欢迎的以太坊钱包，支持浏览器扩展和移动应用，是Web3应用的主要入口。', 5, 501, 'https://metamask.io', 'https://metamask.io/favicon.ico', 0, '["钱包", "浏览器扩展", "Web3入口", "多链支持"]', '["Ethereum", "BSC", "Polygon", "Avalanche"]', '{"twitter": "https://twitter.com/metamask", "discord": "https://discord.gg/metamask"}'),

('Trust Wallet', '币安官方钱包', 'Trust Wallet是币安的官方加密货币钱包，支持多链资产管理和DApp浏览。', 5, 501, 'https://trustwallet.com', 'https://trustwallet.com/favicon.ico', 0, '["移动钱包", "多链", "DApp浏览器", "币安生态"]', '["Ethereum", "BSC", "Polygon", "Solana"]', '{"twitter": "https://twitter.com/trustwallet"}'),

-- 硬件钱包
('Ledger', '领先的硬件钱包制造商', 'Ledger是全球领先的硬件钱包制造商，提供最高级别的加密货币安全存储解决方案。', 5, 502, 'https://ledger.com', 'https://ledger.com/favicon.ico', 0, '["硬件钱包", "冷存储", "安全", "多币种支持"]', '["多链支持"]', '{"twitter": "https://twitter.com/ledger"}'),

-- ================================
-- 6. 基础设施 & 开发 项目
-- ================================

-- 公链 & Layer1
('Ethereum', '最大的智能合约平台', 'Ethereum是最大的智能合约平台，支持去中心化应用(DApp)开发，是DeFi和NFT生态的基础。', 6, 601, 'https://ethereum.org', 'https://ethereum.org/favicon.ico', 0, '["公链", "智能合约", "DApp平台", "PoS共识"]', '["Ethereum"]', '{"twitter": "https://twitter.com/ethereum", "github": "https://github.com/ethereum"}'),

('Solana', '高性能区块链平台', 'Solana是一个高性能的区块链平台，以其快速的交易速度和低手续费著称，支持DeFi和NFT应用。', 6, 601, 'https://solana.com', 'https://solana.com/favicon.ico', 0, '["高性能", "低手续费", "快速交易", "DeFi"]', '["Solana"]', '{"twitter": "https://twitter.com/solana", "discord": "https://discord.gg/pquxPsq"}'),

('Polygon', '以太坊扩容解决方案', 'Polygon是以太坊的Layer2扩容解决方案，提供更快的交易速度和更低的手续费。', 6, 602, 'https://polygon.technology', 'https://polygon.technology/favicon.ico', 0, '["Layer2", "扩容", "低手续费", "以太坊兼容"]', '["Polygon", "Ethereum"]', '{"twitter": "https://twitter.com/0xpolygon", "discord": "https://discord.gg/XvpHAxZ"}'),

-- Layer2 & 扩容
('Arbitrum', '以太坊Optimistic Rollup', 'Arbitrum是以太坊的Optimistic Rollup扩容方案，提供与以太坊完全兼容的低成本交易。', 6, 602, 'https://arbitrum.io', 'https://arbitrum.io/favicon.ico', 0, '["Layer2", "Optimistic Rollup", "以太坊兼容", "低成本"]', '["Arbitrum", "Ethereum"]', '{"twitter": "https://twitter.com/arbitrum", "discord": "https://discord.gg/ZpZuw7p"}'),

('Optimism', '以太坊Optimistic Rollup', 'Optimism是以太坊的Optimistic Rollup解决方案，致力于扩展以太坊的可用性。', 6, 602, 'https://optimism.io', 'https://optimism.io/favicon.ico', 0, '["Layer2", "Optimistic Rollup", "公共产品资助", "以太坊扩容"]', '["Optimism", "Ethereum"]', '{"twitter": "https://twitter.com/optimismfnd", "discord": "https://discord.gg/jrnFEvq"}'),

-- ================================
-- 7. 媒体 & 资讯 项目
-- ================================

-- 区块链媒体
('CoinDesk', '领先的区块链新闻媒体', 'CoinDesk是全球领先的区块链和加密货币新闻媒体，提供行业资讯、分析和市场数据。', 7, 701, 'https://coindesk.com', 'https://coindesk.com/favicon.ico', 0, '["新闻媒体", "行业资讯", "市场分析", "会议活动"]', '["信息服务"]', '{"twitter": "https://twitter.com/coindesk"}'),

('Cointelegraph', '区块链新闻和分析平台', 'Cointelegraph是一个独立的数字媒体资源，涵盖区块链技术、加密资产和新兴金融科技趋势的新闻。', 7, 701, 'https://cointelegraph.com', 'https://cointelegraph.com/favicon.ico', 0, '["新闻", "分析", "教育内容", "多语言"]', '["信息服务"]', '{"twitter": "https://twitter.com/cointelegraph"}'),

-- ================================
-- 8. 教育 & 学习 项目
-- ================================

-- Web3 教程平台
('Buildspace', 'Web3开发者教育平台', 'Buildspace是一个Web3开发者教育平台，提供实践性的区块链开发课程和项目。', 8, 801, 'https://buildspace.so', 'https://buildspace.so/favicon.ico', 0, '["开发者教育", "实践项目", "Web3开发", "社区学习"]', '["教育平台"]', '{"twitter": "https://twitter.com/_buildspace", "discord": "https://discord.gg/buildspace"}'),

-- ================================
-- 9. 社交 & 社区 项目
-- ================================

-- 去中心化社交
('Lens Protocol', '去中心化社交图谱协议', 'Lens Protocol是一个去中心化的社交图谱协议，允许用户拥有和控制自己的社交数据。', 9, 901, 'https://lens.xyz', 'https://lens.xyz/favicon.ico', 0, '["去中心化社交", "社交图谱", "用户数据主权", "可组合性"]', '["Polygon"]', '{"twitter": "https://twitter.com/lensprotocol", "discord": "https://discord.gg/lensprotocol"}'),

-- DAO & 治理平台
('Snapshot', 'DAO治理投票平台', 'Snapshot是一个去中心化的治理平台，允许DAO和DeFi协议进行链下投票治理。', 9, 904, 'https://snapshot.org', 'https://snapshot.org/favicon.ico', 0, '["DAO治理", "投票平台", "链下治理", "社区决策"]', '["多链支持"]', '{"twitter": "https://twitter.com/snapshotlabs", "discord": "https://discord.gg/snapshot"}'),

-- ================================
-- 10. 投资 & 融资 项目
-- ================================

-- IDO & 众筹平台
('Gitcoin', '开源项目资助平台', 'Gitcoin是一个支持开源软件开发的平台，通过二次方资助等机制为开源项目提供资金支持。', 10, 1002, 'https://gitcoin.co', 'https://gitcoin.co/favicon.ico', 0, '["开源资助", "二次方资助", "公共产品", "开发者激励"]', '["Ethereum", "Polygon"]', '{"twitter": "https://twitter.com/gitcoin", "discord": "https://discord.gg/gitcoin"}'),

-- ================================
-- 11. 工具 & 实用程序 项目
-- ================================

-- 多链工具
('DeBank', '多链DeFi投资组合追踪器', 'DeBank是一个多链DeFi投资组合追踪器，帮助用户管理和分析他们的DeFi投资。', 11, 1102, 'https://debank.com', 'https://debank.com/favicon.ico', 0, '["投资组合", "多链追踪", "DeFi分析", "资产管理"]', '["Ethereum", "BSC", "Polygon", "Arbitrum"]', '{"twitter": "https://twitter.com/debankdotcom"}'),

-- 实用小工具
('Etherscan', '以太坊区块链浏览器', 'Etherscan是最受欢迎的以太坊区块链浏览器，提供交易查询、合约验证等功能。', 11, 1106, 'https://etherscan.io', 'https://etherscan.io/favicon.ico', 0, '["区块链浏览器", "交易查询", "合约验证", "数据查看"]', '["Ethereum"]', '{"twitter": "https://twitter.com/etherscan"}'),

-- ================================
-- 12. 招聘 & 职业 项目
-- ================================

-- Web3 招聘平台
('CryptoJobs', 'Web3招聘平台', 'CryptoJobs是专门的Web3和加密货币行业招聘平台，连接求职者和Web3公司。', 12, 1201, 'https://crypto.jobs', 'https://crypto.jobs/favicon.ico', 0, '["Web3招聘", "加密货币工作", "远程工作", "区块链职位"]', '["招聘平台"]', '{"twitter": "https://twitter.com/cryptojobslist"}'),

('Web3 Career', 'Web3职业发展平台', 'Web3 Career专注于Web3行业的职业发展，提供工作机会、技能培训和职业指导。', 12, 1205, 'https://web3.career', 'https://web3.career/favicon.ico', 0, '["职业发展", "技能培训", "Web3工作", "职业指导"]', '["职业平台"]', '{"twitter": "https://twitter.com/web3career"}');

-- 重置自增ID
ALTER TABLE `web3_projects` AUTO_INCREMENT = 1;