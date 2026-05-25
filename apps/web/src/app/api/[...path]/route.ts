import { type NextRequest, NextResponse } from 'next/server';

export const maxDuration = 300; // 5분 — AI 분석 응답 대기

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const FORWARD_REQ_HEADERS = ['content-type', 'cookie', 'authorization'];
const FORWARD_RES_HEADERS = ['content-type', 'cache-control'];

async function proxy(request: NextRequest, params: { path: string[] }): Promise<NextResponse> {
  if (!API_BASE) {
    return new NextResponse('API_BASE_URL is not configured', { status: 500 });
  }
  const path = params.path.join('/');
  const search = request.nextUrl.search;
  const url = `${API_BASE}/api/${path}${search}`;

  const headers = new Headers();
  for (const key of FORWARD_REQ_HEADERS) {
    const value = request.headers.get(key);
    if (value) {
      headers.set(key, value);
    }
  }

  // arrayBuffer로 읽어야 multipart/form-data 등 바이너리 바디가 손상되지 않음
  const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer();

  const backendRes = await fetch(url, {
    method: request.method,
    headers,
    body,
  });

  const resHeaders = new Headers();
  for (const key of FORWARD_RES_HEADERS) {
    const value = backendRes.headers.get(key);
    if (value) {
      resHeaders.set(key, value);
    }
  }
  for (const cookie of backendRes.headers.getSetCookie()) {
    resHeaders.append('Set-Cookie', cookie.replace(/;\s*domain=[^;]*/gi, ''));
  }

  const resBody = await backendRes.text();
  return new NextResponse(resBody, { status: backendRes.status, headers: resHeaders });
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(request, await params);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(request, await params);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(request, await params);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(request, await params);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(request, await params);
}
