import { type NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export async function POST(request: NextRequest) {
  const body = await request.text();

  const backendRes = await fetch(`${API_BASE}/api/v1/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  const contentType = backendRes.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const rawBody = await backendRes.text();

  const response = isJson
    ? NextResponse.json(JSON.parse(rawBody), { status: backendRes.status })
    : new NextResponse(rawBody, {
        status: backendRes.status,
        headers: { 'content-type': contentType || 'text/plain' },
      });

  for (const cookie of backendRes.headers.getSetCookie()) {
    response.headers.append('Set-Cookie', cookie.replace(/;\s*domain=[^;]*/gi, ''));
  }

  return response;
}
