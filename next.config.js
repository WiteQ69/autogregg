/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // albo usuń całą linię, albo zostaw bez lucide-react
    optimizePackageImports: ['react-icons']
  }
}
module.exports = nextConfig
