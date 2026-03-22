/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.sanity.io' },
    ],
  },
  // Move it here, out of experimental
  typedRoutes: true,
};

module.exports = nextConfig;