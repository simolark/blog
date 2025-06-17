/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages配置 - 仓库名为blog
  basePath: '/blog',
  assetPrefix: '/blog/',
}

module.exports = nextConfig 