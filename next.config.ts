import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: '**'
      }
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/board',
        destination: '/',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
