/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["127.0.0.1", "localhost", "yt3.ggpht.com", "github.com", 'avatars.githubusercontent.com', 'raw.githubusercontent.com', "www.sammeechward.com"],
  },
  // output: 'standalone',
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
    };

    return config;
  },
}

module.exports = nextConfig
