import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用 standalone 输出模式，用于 Docker 部署
  output: 'standalone',
  
  // 其他配置选项
  experimental: {
    // 优化构建性能
    optimizeCss: true,
  },
};

export default nextConfig;
