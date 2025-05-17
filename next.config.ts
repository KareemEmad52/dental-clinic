import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  // experimental: {
  //   esmExternals: 'loose',
  // },
  transpilePackages: ['@react-pdf/renderer'],
};

export default nextConfig;
