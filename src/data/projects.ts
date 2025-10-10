import { Web3Project, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'defi',
    name: 'DeFi',
    icon: '💰',
    subcategories: [
      { id: 'dex', name: 'DEX', count: 15 },
      { id: 'lending', name: '借贷', count: 12 },
      { id: 'yield', name: '收益农场', count: 8 },
      { id: 'derivatives', name: '衍生品', count: 6 }
    ]
  },
  {
    id: 'nft',
    name: 'NFT',
    icon: '🎨',
    subcategories: [
      { id: 'marketplace', name: '市场', count: 10 },
      { id: 'gaming', name: '游戏', count: 8 },
      { id: 'art', name: '艺术', count: 12 },
      { id: 'utility', name: '实用工具', count: 5 }
    ]
  },
  {
    id: 'infrastructure',
    name: '基础设施',
    icon: '🔧',
    subcategories: [
      { id: 'blockchain', name: '区块链', count: 20 },
      { id: 'wallet', name: '钱包', count: 15 },
      { id: 'bridge', name: '跨链桥', count: 8 },
      { id: 'oracle', name: '预言机', count: 6 }
    ]
  },
  {
    id: 'dao',
    name: 'DAO',
    icon: '🏛️',
    subcategories: [
      { id: 'governance', name: '治理', count: 12 },
      { id: 'investment', name: '投资', count: 8 },
      { id: 'social', name: '社交', count: 6 }
    ]
  },
  {
    id: 'tools',
    name: '开发工具',
    icon: '⚡',
    subcategories: [
      { id: 'analytics', name: '分析工具', count: 10 },
      { id: 'security', name: '安全工具', count: 8 },
      { id: 'development', name: '开发框架', count: 12 }
    ]
  }
];

export const projects: Web3Project[] = [
  // DeFi Projects
  {
    id: '1',
    name: 'Uniswap',
    description: '去中心化交易协议，支持自动化做市商',
    detailedDescription: 'Uniswap是一个去中心化的交易协议，建立在以太坊区块链上，它彻底改变了数字资产的交易方式。作为自动化做市商（AMM）的先驱，Uniswap允许用户在没有传统订单簿的情况下进行代币交换。该协议使用流动性池来促进交易，任何人都可以成为流动性提供者，通过向池中存入代币对来赚取交易费用。Uniswap的核心创新在于其恒定乘积公式（x*y=k），这确保了流动性池中的代币比例始终保持平衡。该协议完全去中心化，没有中央权威机构控制，所有交易都通过智能合约自动执行。Uniswap V3引入了集中流动性的概念，允许流动性提供者在特定价格范围内提供流动性，从而提高资本效率。该协议支持数千种ERC-20代币的交易，并且已经扩展到多个区块链网络。Uniswap的治理代币UNI允许持有者参与协议的决策过程，包括费用结构、新功能的实施等。作为DeFi生态系统的基石，Uniswap已经处理了数千亿美元的交易量，为整个去中心化金融领域的发展奠定了坚实基础。',
    category: 'defi',
    subcategory: 'dex',
    url: 'https://uniswap.org',
    tags: ['DEX', 'AMM', 'Ethereum'],
    chains: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base'],
    viewCount: 15420,
    officialLinks: {
      website: 'https://uniswap.org',
      whitepaper: 'https://uniswap.org/whitepaper-v3.pdf',
      twitter: 'https://twitter.com/Uniswap',
      telegram: 'https://t.me/UniswapProtocol',
      discord: 'https://discord.gg/FCfyBSbCU5',
      github: 'https://github.com/Uniswap',
      medium: 'https://uniswap.org/blog'
    },
    news: [
      {
        id: 'uni-1',
        title: 'Uniswap V4 开发进展更新',
        summary: 'Uniswap Labs 发布了 V4 版本的最新开发进展，引入了 Hooks 功能，允许开发者在流动性池中添加自定义逻辑。',
        publishedAt: '2024-01-15T10:30:00Z',
        url: 'https://uniswap.org/blog/uniswap-v4-development-update',
        source: 'Uniswap Blog'
      },
      {
        id: 'uni-2',
        title: '单日交易量突破 20 亿美元',
        summary: 'Uniswap 协议在昨日acee创建新的里程碑，单日交易量首次突破 20 亿美元，显示了 DeFi 市场的强劲增长。',
        publishedAt: '2024-01-12T14:20:00Z',
        url: 'https://uniswap.org/blog/record-trading-volume',
        source: 'Uniswap Blog'
      },
      {
        id: 'uni-3',
        title: '新增支持 Arbitrum One 网络',
        summary: 'Uniswap V3 正式部署到 Arbitrum One 网络，为用户提供更低的交易费用和更快的交易确认速度。',
        publishedAt: '2024-01-08T09:15:00Z',
        url: 'https://uniswap.org/blog/arbitrum-deployment',
        source: 'Uniswap Blog'
      },
      {
        id: 'uni-4',
        title: 'UNI 代币质押功能即将上线',
        summary: 'Uniswap 治理社区投票通过了 UNI 代币质押提案，持有者将能够质押代币获得协议费用分成。',
        publishedAt: '2024-01-05T16:45:00Z',
        url: 'https://uniswap.org/blog/uni-staking-proposal',
        source: 'Uniswap Blog'
      },
      {
        id: 'uni-5',
        title: '流动性挖矿计划第三期启动',
        summary: 'Uniswap 宣布启动第三期流动性挖矿计划，总奖励池达到 1000 万 UNI 代币，持续时间为 6 个月。',
        publishedAt: '2024-01-02T11:30:00Z',
        url: 'https://uniswap.org/blog/liquidity-mining-phase-3',
        source: 'Uniswap Blog'
      }
    ]
  },
  {
    id: '2',
    name: 'Aave',
    description: '开源的去中心化借贷协议',
    detailedDescription: 'Aave是一个开源的去中心化借贷协议，允许用户存入加密货币资产以赚取利息，或者使用这些资产作为抵押品来借入其他资产。作为DeFi领域的领先协议之一，Aave引入了许多创新功能，包括闪电贷（Flash Loans）、利率切换、aTokens等。闪电贷允许用户在同一笔交易中借入和偿还资金，无需抵押品，这为套利、债务再融资和其他复杂的DeFi策略开辟了新的可能性。Aave支持两种利率模式：稳定利率和可变利率，用户可以根据市场条件在两者之间切换。当用户向Aave存入资产时，他们会收到相应的aTokens，这些代币代表他们在协议中的存款，并且会随着时间的推移自动累积利息。Aave协议由AAVE代币持有者治理，他们可以对协议参数、新资产的添加、风险参数等进行投票。该协议已经部署在多个区块链网络上，包括以太坊、Polygon、Avalanche等，为用户提供了更多的选择和更低的交易费用。Aave的安全模型包括多层保护机制，如安全模块、保险基金等，以保护用户资金的安全。',
    category: 'defi',
    subcategory: 'lending',
    url: 'https://aave.com',
    tags: ['借贷', 'DeFi', '流动性'],
    chains: ['Ethereum', 'Polygon', 'Avalanche', 'Arbitrum', 'Optimism', 'Base'],
    viewCount: 12850,
    officialLinks: {
      website: 'https://aave.com',
      whitepaper: 'https://github.com/aave/aave-protocol/blob/master/docs/Aave_Protocol_Whitepaper_v1_0.pdf',
      twitter: 'https://twitter.com/AaveAave',
      telegram: 'https://t.me/Aavesome',
      discord: 'https://discord.gg/CvKUrqM',
      github: 'https://github.com/aave',
      medium: 'https://medium.com/aave'
    },
    news: [
      {
        id: 'aave-1',
        title: 'Aave V3 正式部署到 Base 网络',
        summary: 'Aave 协议 V3 版本成功部署到 Coinbase 的 Base 网络，为用户提供更低成本的借贷服务。',
        publishedAt: '2024-01-14T13:25:00Z',
        url: 'https://medium.com/aave/aave-v3-base-deployment',
        source: 'Aave Blog'
      },
      {
        id: 'aave-2',
        title: '总锁仓价值突破 150 亿美元',
        summary: 'Aave 协议的总锁仓价值（TVL）首次突破 150 亿美元大关，巩固了其在 DeFi 借贷领域的领导地位。',
        publishedAt: '2024-01-11T08:40:00Z',
        url: 'https://medium.com/aave/tvl-milestone-150-billion',
        source: 'Aave Blog'
      },
      {
        id: 'aave-3',
        title: '推出 GHO 稳定币测试版',
        summary: 'Aave 推出了原生稳定币 GHO 的测试版本，用户可以使用抵押品铸造 GHO 稳定币。',
        publishedAt: '2024-01-09T15:20:00Z',
        url: 'https://medium.com/aave/gho-stablecoin-testnet',
        source: 'Aave Blog'
      },
      {
        id: 'aave-4',
        title: '安全模块升级完成',
        summary: 'Aave 完成了安全模块的重大升级，提高了协议的安全性和资本效率。',
        publishedAt: '2024-01-06T12:15:00Z',
        url: 'https://medium.com/aave/safety-module-upgrade',
        source: 'Aave Blog'
      }
    ]
  },
  {
    id: '3',
    name: 'Compound',
    description: '算法货币市场协议',
    category: 'defi',
    subcategory: 'lending',
    url: 'https://compound.finance',
    tags: ['借贷', 'DeFi', '利率'],
    chains: ['Ethereum', 'Polygon'],
    viewCount: 8920
  },
  {
    id: '4',
    name: 'Yearn Finance',
    description: '收益优化协议',
    category: 'defi',
    subcategory: 'yield',
    url: 'https://yearn.finance',
    tags: ['收益农场', 'DeFi', '自动化'],
    chains: ['Ethereum', 'Fantom', 'Arbitrum'],
    viewCount: 7650
  },
  
  // NFT Projects
  {
    id: '5',
    name: 'OpenSea',
    description: '最大的NFT市场',
    detailedDescription: 'OpenSea是世界上最大的NFT（非同质化代币）市场，为数字收藏品、艺术品、游戏物品和其他区块链资产提供了一个去中心化的交易平台。自2017年成立以来，OpenSea已经成为NFT生态系统的核心基础设施，支持以太坊、Polygon、Klaytn、Solana等多个区块链网络。该平台允许用户创建、购买、出售和发现独特的数字资产，从数字艺术作品到虚拟世界中的土地，再到游戏中的稀有物品。OpenSea提供了强大的搜索和过滤功能，用户可以根据价格、稀有度、属性等多种标准来浏览和发现NFT。平台支持多种销售方式，包括固定价格销售、荷兰式拍卖和英式拍卖。OpenSea还提供了创作者版税功能，确保原创者在其作品的二次销售中获得持续收益。该平台的用户界面直观易用，降低了NFT交易的门槛，使更多人能够参与到数字收藏品的世界中。OpenSea还推出了OpenSea Pro等高级功能，为专业交易者提供更深入的市场分析工具。作为NFT市场的领导者，OpenSea在推动数字所有权概念的普及和NFT技术的发展方面发挥了重要作用。',
    category: 'nft',
    subcategory: 'marketplace',
    url: 'https://opensea.io',
    tags: ['NFT', '市场', 'Ethereum'],
    chains: ['Ethereum', 'Polygon', 'Klaytn', 'Solana'],
    viewCount: 18750,
    officialLinks: {
      website: 'https://opensea.io',
      twitter: 'https://twitter.com/opensea',
      discord: 'https://discord.gg/opensea',
      github: 'https://github.com/ProjectOpenSea',
      medium: 'https://opensea.io/blog'
    },
    news: [
      {
        id: 'opensea-1',
        title: 'OpenSea Pro 推出高级交易功能',
        summary: 'OpenSea 发布了 Pro 版本，为专业交易者提供实时价格图表、稀有度分析和批量交易等高级功能。',
        publishedAt: '2024-01-13T16:30:00Z',
        url: 'https://opensea.io/blog/opensea-pro-launch',
        source: 'OpenSea Blog'
      },
      {
        id: 'opensea-2',
        title: '支持 Solana NFT 交易',
        summary: 'OpenSea 正式支持 Solana 区块链上的 NFT 交易，扩大了平台的生态系统覆盖范围。',
        publishedAt: '2024-01-10T11:45:00Z',
        url: 'https://opensea.io/blog/solana-support',
        source: 'OpenSea Blog'
      },
      {
        id: 'opensea-3',
        title: '创作者版税新政策发布',
        summary: 'OpenSea 发布了新的创作者版税政策，旨在更好地保护创作者权益并提高市场透明度。',
        publishedAt: '2024-01-07T14:20:00Z',
        url: 'https://opensea.io/blog/creator-royalty-policy',
        source: 'OpenSea Blog'
      },
      {
        id: 'opensea-4',
        title: '月交易量创历史新高',
        summary: 'OpenSea 在上个月的交易量达到了历史新高，总交易额超过 5 亿美元，显示 NFT 市场的强劲复苏。',
        publishedAt: '2024-01-04T09:30:00Z',
        url: 'https://opensea.io/blog/record-monthly-volume',
        source: 'OpenSea Blog'
      }
    ]
  },
  {
    id: '6',
    name: 'Axie Infinity',
    description: '基于NFT的游戏生态系统',
    category: 'nft',
    subcategory: 'gaming',
    url: 'https://axieinfinity.com',
    tags: ['游戏', 'NFT', 'Play-to-Earn'],
    chains: ['Ronin', 'Ethereum'],
    viewCount: 9340
  },
  {
    id: '7',
    name: 'SuperRare',
    description: '数字艺术NFT平台',
    category: 'nft',
    subcategory: 'art',
    url: 'https://superrare.com',
    tags: ['艺术', 'NFT', '收藏品'],
    chains: ['Ethereum'],
    viewCount: 5680
  },
  
  // Infrastructure Projects
  {
    id: '8',
    name: 'Ethereum',
    description: '智能合约区块链平台',
    detailedDescription: 'Ethereum是一个开源的区块链平台，支持智能合约功能，由Vitalik Buterin在2013年提出，并于2015年正式启动。作为第二大加密货币平台，Ethereum不仅仅是一种数字货币，更是一个完整的去中心化应用（DApp）生态系统。Ethereum的核心创新是引入了图灵完备的虚拟机（EVM），使开发者能够在区块链上构建和部署复杂的智能合约。这些智能合约是自动执行的程序，当预定条件满足时会自动执行，无需第三方干预。Ethereum为整个DeFi（去中心化金融）生态系统奠定了基础，支持了数千个去中心化应用，包括去中心化交易所、借贷协议、NFT市场等。2022年，Ethereum成功完成了从工作量证明（PoW）到权益证明（PoS）的重要升级，这次被称为"The Merge"的升级大大降低了网络的能源消耗。Ethereum的原生代币ETH不仅用作交易费用（Gas费），还在PoS机制中用于质押以维护网络安全。Ethereum持续发展，计划通过分片等技术进一步提高可扩展性，以支持更大规模的应用。',
    category: 'infrastructure',
    subcategory: 'blockchain',
    url: 'https://ethereum.org',
    tags: ['区块链', '智能合约', 'Layer 1'],
    chains: ['Ethereum'],
    viewCount: 22100,
    officialLinks: {
      website: 'https://ethereum.org',
      whitepaper: 'https://ethereum.org/en/whitepaper/',
      twitter: 'https://twitter.com/ethereum',
      github: 'https://github.com/ethereum',
      medium: 'https://blog.ethereum.org'
    },
    news: [
      {
        id: 'eth-1',
        title: 'Dencun 升级成功激活',
        summary: 'Ethereum 网络成功激活 Dencun 升级，引入了 EIP-4844 (Proto-Danksharding)，大幅降低了 Layer 2 的交易成本。',
        publishedAt: '2024-01-16T12:00:00Z',
        url: 'https://blog.ethereum.org/dencun-upgrade-activation',
        source: 'Ethereum Blog'
      },
      {
        id: 'eth-2',
        title: '质押 ETH 总量超过 3000 万',
        summary: 'Ethereum 网络中质押的 ETH 总量首次超过 3000 万枚，约占总供应量的 25%，显示了网络的强大安全性。',
        publishedAt: '2024-01-12T10:15:00Z',
        url: 'https://blog.ethereum.org/staking-milestone-30m',
        source: 'Ethereum Blog'
      },
      {
        id: 'eth-3',
        title: '以太坊基金会发布 2024 路线图',
        summary: '以太坊基金会发布了 2024 年的技术路线图，重点关注可扩展性、安全性和去中心化的进一步提升。',
        publishedAt: '2024-01-08T14:30:00Z',
        url: 'https://blog.ethereum.org/2024-roadmap',
        source: 'Ethereum Blog'
      },
      {
        id: 'eth-4',
        title: '网络活跃地址数创新高',
        summary: 'Ethereum 网络的日活跃地址数达到了历史新高，超过 100 万个地址，反映了生态系统的持续增长。',
        publishedAt: '2024-01-05T16:45:00Z',
        url: 'https://blog.ethereum.org/active-addresses-milestone',
        source: 'Ethereum Blog'
      },
      {
        id: 'eth-5',
        title: 'Layer 2 生态系统快速发展',
        summary: 'Ethereum Layer 2 解决方案的总锁仓价值突破 400 亿美元，Arbitrum、Optimism 和 Polygon 领跑市场。',
        publishedAt: '2024-01-03T11:20:00Z',
        url: 'https://blog.ethereum.org/layer2-ecosystem-growth',
        source: 'Ethereum Blog'
      }
    ]
  },
  {
    id: '9',
    name: 'MetaMask',
    description: '以太坊钱包和网关',
    category: 'infrastructure',
    subcategory: 'wallet',
    url: 'https://metamask.io',
    tags: ['钱包', '浏览器扩展', 'Web3'],
    chains: ['Ethereum', 'BSC', 'Polygon', 'Avalanche', 'Arbitrum', 'Optimism'],
    viewCount: 16890
  },
  {
    id: '10',
    name: 'Polygon',
    description: '以太坊扩容解决方案',
    category: 'infrastructure',
    subcategory: 'blockchain',
    url: 'https://polygon.technology',
    tags: ['Layer 2', '扩容', 'Ethereum'],
    chains: ['Polygon', 'Ethereum'],
    viewCount: 11250
  },
  {
    id: '11',
    name: 'Chainlink',
    description: '去中心化预言机网络',
    category: 'infrastructure',
    subcategory: 'oracle',
    url: 'https://chain.link',
    tags: ['预言机', '数据', 'DeFi'],
    chains: ['Ethereum', 'BSC', 'Polygon', 'Avalanche', 'Arbitrum', 'Optimism', 'Fantom'],
    viewCount: 9870
  },
  {
    id: '12',
    name: 'MakerDAO',
    description: '去中心化自治组织，管理DAI稳定币',
    category: 'dao',
    subcategory: 'governance',
    url: 'https://makerdao.com',
    tags: ['DAO', '稳定币', '治理'],
    chains: ['Ethereum'],
    viewCount: 6420
  },
  {
    id: '13',
    name: 'Aragon',
    description: 'DAO创建和管理平台',
    category: 'dao',
    subcategory: 'governance',
    url: 'https://aragon.org',
    tags: ['DAO', '治理', '工具'],
    chains: ['Ethereum', 'Polygon', 'Arbitrum'],
    viewCount: 4580
  },
  {
    id: '14',
    name: 'Etherscan',
    description: '以太坊区块链浏览器',
    category: 'tools',
    subcategory: 'analytics',
    url: 'https://etherscan.io',
    tags: ['区块链浏览器', '分析', 'Ethereum'],
    chains: ['Ethereum'],
    viewCount: 13670
  },
  {
    id: '15',
    name: 'Hardhat',
    description: '以太坊开发环境',
    category: 'tools',
    subcategory: 'development',
    url: 'https://hardhat.org',
    tags: ['开发工具', '测试', 'Solidity'],
    chains: ['Ethereum'],
    viewCount: 7890
  },
  {
    id: '16',
    name: 'Remix',
    description: '在线Solidity IDE',
    category: 'tools',
    subcategory: 'development',
    url: 'https://remix.ethereum.org',
    tags: ['IDE', 'Solidity', '开发'],
    chains: ['Ethereum'],
    viewCount: 6230
  }
];