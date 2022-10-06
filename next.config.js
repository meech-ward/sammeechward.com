/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["127.0.0.1", "localhost", "yt3.ggpht.com", "github.com", 'avatars.githubusercontent.com', 'raw.githubusercontent.com'],
  },
  experimental: { images: { allowFutureImage: true } },
  // output: 'standalone',
}

module.exports = nextConfig
