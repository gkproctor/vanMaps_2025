import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.sanity.io' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  experimental: { typedRoutes: true }
};
export default nextConfig;
