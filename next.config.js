const nextSafe = require('next-safe');

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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: nextSafe({
          isDev: process.env.NODE_ENV !== 'production',
          referrerPolicy: 'strict-origin-when-cross-origin',
          contentSecurityPolicy: {
            'default-src': "'none'",
            'font-src': "'self' fonts.gstatic.com",
            'img-src': "'self' data: *",
            'frame-src': 'www.google.com',
            'style-src': "'self' 'unsafe-inline'",
            'connect-src': "'self' 'unsafe-inline' *",
            'script-src': "'self' 'unsafe-eval' 'unsafe-inline' *",
          },
        }),
      },
    ];
  },
};

module.exports = nextConfig;
