# Web3 Compass 部署指南

## 前提条件

- 已安装 Docker 和 Docker Compose
- 已有可用的 MySQL 数据库
- 已配置 Google OAuth 应用

## 快速部署

### 方法一：使用 Docker Compose（推荐）

1. **配置环境变量**
   ```bash
   cp .env.production .env
   ```
   
   编辑 `.env` 文件，填入你的实际配置：
   ```env
   # NextAuth配置
   NEXTAUTH_SECRET=your-production-secret-key-here-make-it-long-and-random
   NEXTAUTH_URL=http://your-domain.com  # 或 http://localhost:3000
   
   # Google OAuth配置
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # 数据库配置
   DATABASE_URL=mysql://username:password@your-mysql-host:3306/web3_compass
   ```


2. **构建并启动应用**
   ```bash
   docker-compose up -d --build
   ```

3. **访问应用**
   
  