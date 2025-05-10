import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 開発環境でNextのインジケーターを消す
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
