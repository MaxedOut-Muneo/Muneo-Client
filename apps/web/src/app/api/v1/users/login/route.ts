import { type NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export async function POST(request: NextRequest) {
  const body = await request.text();

  const backendRes = await fetch(`${API_BASE}/api/v1/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  const data = await backendRes.json();
  const response = NextResponse.json(data, { status: backendRes.status });

  for (const cookie of backendRes.headers.getSetCookie()) {
    // Domain 속성 제거: localhost에서도 쿠키가 설정되도록 함
    response.headers.append('Set-Cookie', cookie.replace(/;\s*domain=[^;]*/gi, ''));
  }

  return response;
}
