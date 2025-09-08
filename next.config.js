/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // NIE przerywaj builda przez błędy ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // NIE przerywaj builda przez błędy TypeScript
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
