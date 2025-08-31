// next.config.js
const nextConfig = {
  images: { /* … */ },
  typedRoutes: true,          // ✅ use this key
  // experimental: { typedRoutes: true }  // ❌ remove this old location
};
module.exports = nextConfig;
