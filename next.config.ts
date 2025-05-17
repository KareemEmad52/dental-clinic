import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'yemca-services.net',
      },
    ],
  },
  // experimental: {
  //   esmExternals: 'loose',
  // },
  transpilePackages: ['@react-pdf/renderer'],
};

export default nextConfig;
