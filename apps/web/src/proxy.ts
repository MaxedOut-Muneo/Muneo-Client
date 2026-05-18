import { type NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/home', '/estimate', '/analysis', '/history', '/settings'];
const AUTH_PATHS = ['/login', '/signup'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token');

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  const isAuthRoute = AUTH_PATHS.some((p) => pathname.startsWith(p));

  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/home/:path*',
    '/estimate/:path*',
    '/analysis/:path*',
    '/history/:path*',
    '/settings/:path*',
    '/login',
    '/signup',
    '/auth/callback/:path*',
  ],
};
