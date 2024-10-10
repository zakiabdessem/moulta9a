/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
