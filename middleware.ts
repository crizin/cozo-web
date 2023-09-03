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
  const requestHeaders = new Headers();

  const nonce = crypto.randomUUID();
  const csp = `
    default-src 'none';
    base-uri 'self';
    connect-src 'self' analytics.google.com;
    font-src 'self' fonts.gstatic.com;
    form-action 'none';
    frame-ancestors 'none';
    frame-src www.google.com;
    img-src 'self' data: *;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' www.google.com www.googletagmanager.com www.gstatic.com;
    style-src 'self' 'unsafe-inline';
  `;

  requestHeaders.set('Content-Security-Policy', csp.replace(/\s{2,}/g, ' ').trim());
  requestHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  requestHeaders.set('X-Content-Type-Options', 'nosniff');
  requestHeaders.set('X-Frame-Options', 'DENY');
  requestHeaders.set('X-Nonce', nonce);
  requestHeaders.set('X-Xss-Protection', '1; mode=block');
  return requestHeaders;
}
