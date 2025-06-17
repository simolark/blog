/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  // 使用自定义域名时不需要 basePath 和 assetPrefix
}

module.exports = nextConfig 