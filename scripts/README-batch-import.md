# 批量导入项目脚本使用说明

## 概述

这个脚本允许您从JSON文件批量导入项目到Web3 Compass中。脚本通过POST API提交项目数据，确保数据一致性和验证逻辑的完整性。

## 前置要求

1. **开发服务器运行**: 确保Web3 Compass开发服务器正在运行
   ```bash
   npm run dev
   ```

2. **Node.js版本**: 需要Node.js 18+（内置fetch）或安装node-fetch
   ```bash
   # 如果Node.js版本较低，需要安装node-fetch
   npm install node-fetch
   ```

## 文件说明

- `batch-import-projects.js` - 主要的批量导入脚本
- `../data/projects-import-template.json` - JSON数据格式模板

## 使用方法

### 1. 启动开发服务器

```bash
# 在项目根目录下运行
npm run dev
```

确保服务器在 `http://localhost:3000` 上运行。

### 2. 准备JSON数据文件

参考 `../data/projects-import-template.json` 文件，创建您的项目数据文件。

### 3. 运行导入脚本

```bash
# 在项目根目录下运行
node scripts/batch-import-projects.js <JSON文件路径>

# 示例
node scripts/batch-import-projects.js ./data/my-projects.json
```

## JSON数据格式

每个项目对象必须包含以下字段：

### 必填字段

- `name` (string) - 项目名称
- `description` (string) - 项目简介
- `category` (string) - 主分类
- `url` (string) - 官方网站URL

### 可选字段

- `detailedDescription` (string) - 详细介绍
- `subcategory` (string) - 子分类
- `logo` (string) - Logo图片URL
- `tags` (array) - 项目标签数组
- `chains` (array) - 支持的区块链数组
- `officialLinks` (object) - 官方链接对象

### 支持的分类

#### 主分类 (category)
- `defi` - 去中心化金融
- `nft` - 非同质化代币
- `dao` - 去中心化自治组织
- `infrastructure` - 基础设施
- `gaming` - 游戏
- `social` - 社交
- `tools` - 开发工具

#### 子分类 (subcategory)
- DeFi: `dex`, `lending`, `yield`, `derivatives`, `insurance`
- NFT: `marketplace`, `art`, `gaming`, `collectibles`, `utility`
- Infrastructure: `wallet`, `oracle`, `bridge`, `storage`, `identity`
- 等等...

### 支持的区块链 (chains)
- `ethereum`
- `bitcoin`
- `bsc` (Binance Smart Chain)
- `polygon`
- `arbitrum`
- `optimism`
- `avalanche`
- `fantom`
- `solana`
- `cardano`
- 等等...

### 官方链接 (officialLinks)
```json
{
  "twitter": "https://twitter.com/project",
  "github": "https://github.com/project",
  "discord": "https://discord.gg/project",
  "telegram": "https://t.me/project",
  "medium": "https://medium.com/@project",
  "reddit": "https://reddit.com/r/project",
  "youtube": "https://youtube.com/c/project",
  "linkedin": "https://linkedin.com/company/project"
}
```

## 脚本功能

### API集成
- 通过POST API (`/api/projects/submit`) 提交项目
- 利用现有的验证和处理逻辑
- 确保数据一致性和完整性

### 数据验证
- 检查必填字段
- 验证URL格式
- 验证数据类型
- 检查数组和对象格式

### 重复检查
- 通过API检查项目名称是否已存在
- 跳过重复项目，避免数据冲突

### 错误处理
- 详细的错误信息
- 继续处理其他项目（即使某个项目失败）
- 完整的提交统计报告

### 性能优化
- 请求间添加100ms延迟，避免API过载
- 异步处理，提高效率

### 提交统计
脚本完成后会显示：
- ✅ 成功提交的项目数量
- ⚠️ 跳过的重复项目数量
- ❌ 提交失败的项目数量
- 📊 总处理项目数量

## 示例输出

```
📖 正在读取JSON文件: ./data/my-projects.json
📊 找到 5 个项目待导入
🔍 正在验证项目数据...
✅ 数据验证通过
🔌 正在检查API服务...
✅ API服务连接成功
🚀 开始批量导入...
✅ 项目 "Uniswap" 提交成功 (ID: abc123...)
✅ 项目 "Aave" 提交成功 (ID: def456...)
⚠️  项目 "OpenSea" 已存在，跳过
✅ 项目 "MetaMask" 提交成功 (ID: ghi789...)
✅ 项目 "Chainlink" 提交成功 (ID: jkl012...)

📈 导入完成统计:
  ✅ 成功提交: 4 个项目
  ⚠️  跳过重复: 1 个项目
  ❌ 提交失败: 0 个项目
  📊 总计处理: 5 个项目
```

## 注意事项

1. **开发服务器**: 确保 `npm run dev` 正在运行
2. **API可用性**: 脚本会自动检查API服务是否可用
3. **网络连接**: 确保本地服务器连接正常
4. **数据格式**: 严格按照模板格式准备数据
5. **URL验证**: 确保所有URL格式正确且可访问
6. **请求频率**: 脚本自动控制请求频率，避免API过载

## 故障排除

### 常见错误

1. **API服务不可用**
   ```
   ❌ 无法连接到API服务，请确保开发服务器正在运行
   ```
   **解决方案**: 运行 `npm run dev` 启动开发服务器

2. **JSON格式错误**
   ```
   JSON文件格式错误: Unexpected token...
   ```
   **解决方案**: 检查JSON语法，使用JSON验证工具

3. **字段验证失败**
   ```
   项目 1: 缺少或无效的项目名称
   ```
   **解决方案**: 检查必填字段是否完整，验证数据类型

4. **URL格式错误**
   ```
   项目 1: URL格式无效
   ```
   **解决方案**: 确保URL包含协议（http://或https://）

5. **Node.js版本问题**
   ```
   ❌ 需要安装node-fetch: npm install node-fetch
   ```
   **解决方案**: 升级到Node.js 18+或安装node-fetch

## 工作流程

1. 脚本读取JSON文件并验证数据格式
2. 检查API服务是否可用
3. 对每个项目：
   - 检查是否已存在（通过API）
   - 如果不存在，通过POST API提交
   - 记录结果（成功/失败/跳过）
4. 输出完整的统计报告

所有提交的项目将以"pending"状态保存到数据库中，可以通过管理界面进行审核和管理。