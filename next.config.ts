import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // 外部画像ホストの許可
    domains: ['nextjs.org', 'github.com', 'raw.githubusercontent.com'],
    // 静的サイトの場合は画像最適化を無効化
    unoptimized: true,
  },
};

export default nextConfig;
