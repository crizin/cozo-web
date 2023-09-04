import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

export function middleware() {
  const securityHeaders = getSecurityHeaders();

  return NextResponse.next({
    headers: securityHeaders,
    request: {
      headers: securityHeaders,
    },
  });
}

function getSecurityHeaders() {
  const nonce = crypto.randomUUID();
  const csp = `
    default-src 'none';
    base-uri 'self';
    connect-src 'self' analytics.google.com stats.g.doubleclick.net ${process.env.NEXT_PUBLIC_API_ENDPOINT};
    font-src 'self' fonts.gstatic.com;
    form-action 'none';
    frame-ancestors 'none';
    frame-src www.google.com;
    img-src 'self' data: *;
    script-src 'self' 'unsafe-eval' 'nonce-${nonce}' www.google.com www.googletagmanager.com www.gstatic.com;
    style-src 'self' 'unsafe-inline';
  `;

  const headers = new Headers();
  headers.set('Content-Security-Policy', csp.replace(/\s{2,}/g, ' ').trim());
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Nonce', nonce);
  headers.set('X-Xss-Protection', '1; mode=block');
  return headers;
}
