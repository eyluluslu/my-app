/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Vercel deployment için kapatıyoruz
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // distDir: 'dist', // Vercel deployment için kapatıyoruz
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',  // Vercel domain'leri için
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',  // Cloudinary için
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true
  },
  // API routes için headers
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
  experimental: {
    esmExternals: false
  }
};

export default nextConfig;
