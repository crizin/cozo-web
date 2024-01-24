/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/board',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
