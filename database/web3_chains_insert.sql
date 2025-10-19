-- Web3 Compass 区块链数据插入语句
-- 创建时间: 2024-01-17
-- 基于实际的 web3_chains 表结构

-- 清空现有数据
DELETE FROM `web3_chains`;

-- 插入区块链数据
INSERT INTO `web3_chains` (`chain_symbol`, `chain_name`, `sort`) VALUES
-- 主流Layer-1链
('ETH', 'Ethereum', 1),
('BTC', 'Bitcoin', 2),
('BNB', 'BNB Smart Chain', 3),
('SOL', 'Solana', 4),
('ADA', 'Cardano', 5),
('AVAX', 'Avalanche', 6),
('DOT', 'Polkadot', 7),
('MATIC', 'Polygon', 8),
('ATOM', 'Cosmos', 9),
('NEAR', 'NEAR Protocol', 10),

-- Layer-2链
('ARB', 'Arbitrum', 11),
('OP', 'Optimism', 12),
('BASE', 'Base', 13),
('ZKSYNC', 'zkSync Era', 14),
('LINEA', 'Linea', 15),

-- 比特币Layer-2链
('LN', 'Lightning Network', 16),
('STX', 'Stacks', 17),
('LBTC', 'Liquid Network', 18),
('RSK', 'Rootstock', 19),
('MERL', 'Merlin Chain', 20),

-- 其他新兴链
('SUI', 'Sui', 21),
('APT', 'Aptos', 22),
('SEI', 'Sei', 23),
('INJ', 'Injective', 24),
('TIA', 'Celestia', 25);

-- 重置自增ID（如果有的话）
-- ALTER TABLE `web3_chains` AUTO_INCREMENT = 1;