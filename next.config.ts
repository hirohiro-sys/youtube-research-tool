import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 開発環境でNextのインジケーターを消す
  devIndicators: false,
  images: {
    domains: ['img.youtube.com'],
  },
};

export default nextConfig;
