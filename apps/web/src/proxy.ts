import { type NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/home', '/estimate', '/analysis', '/history', '/settings'];
const AUTH_PATHS = ['/login', '/signup'];
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  const isAuthRoute = AUTH_PATHS.some((p) => pathname.startsWith(p));

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!isProtected) {
    return NextResponse.next();
  }

  if (accessToken) {
    return NextResponse.next();
  }

  let refreshRes: Response;
  try {
    refreshRes = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { Cookie: request.headers.get('cookie') ?? '' },
    });
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!refreshRes.ok) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = NextResponse.next();
  for (const cookie of refreshRes.headers.getSetCookie()) {
    response.headers.append('Set-Cookie', cookie.replace(/;\s*domain=[^;]*/gi, ''));
  }
  return response;
};

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
