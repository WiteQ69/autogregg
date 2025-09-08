/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },   // ⬅️ pomija błędy TS w czasie builda
  webpack: (config, { dev }) => { if (dev) config.cache = false; return config; },
};
module.exports = nextConfig;
