import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopNavbar from "@/components/TopNavbar";

export const metadata: Metadata = {
  title: "Web3 导航 - 发现最优秀的Web3项目",
  description: "一站式Web3项目导航平台，收录DeFi、NFT、DAO、基础设施等各类优质项目，助您快速发现Web3生态中的精品应用。",
  keywords: "Web3, DeFi, NFT, DAO, 区块链, 以太坊, 去中心化, 加密货币",
  authors: [{ name: "Web3 Compass" }],
  robots: "index, follow",
  openGraph: {
    title: "Web3 导航 - 发现最优秀的Web3项目",
    description: "一站式Web3项目导航平台，收录DeFi、NFT、DAO、基础设施等各类优质项目",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web3 导航 - 发现最优秀的Web3项目",
    description: "一站式Web3项目导航平台，收录DeFi、NFT、DAO、基础设施等各类优质项目",
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <TopNavbar />
        {children}
      </body>
    </html>
  );
}
