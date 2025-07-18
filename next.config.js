/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  basePath: '/blog',
  assetPrefix: '/blog',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig 