/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.sanity.io' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  experimental: { typedRoutes: true },
};

module.exports = nextConfig;
