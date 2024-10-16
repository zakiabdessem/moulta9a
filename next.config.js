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
  headers: async () => {
    return [
      {
        source: '/api/:path*',

        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },

          //{ key: 'Access-Control-Allow-Origin', value: '*' },

          {
            key: 'Access-Control-Allow-Origin',
            value:
              process.env.NEXT_PUBLIC_DEFAULT_URL || 'http://localhost:3000',
          },

          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
          },

          {
            key: 'Access-Control-Allow-Headers',
            value:
              'Accept, Accept-Version, Content-Length, Content-Type, Authorization',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
