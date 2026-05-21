import { type NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const FORWARD_REQ_HEADERS = ['content-type', 'cookie', 'x-user-id', 'authorization'];
const FORWARD_RES_HEADERS = ['content-type', 'cache-control'];

async function proxy(request: NextRequest, params: { path: string[] }): Promise<NextResponse> {
  const path = params.path.join('/');
  const search = request.nextUrl.search;
  const url = `${API_BASE}/api/${path}${search}`;

  const headers = new Headers();
  for (const key of FORWARD_REQ_HEADERS) {
    const value = request.headers.get(key);
    if (value) {headers.set(key, value);}
  }

  const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.text();

  const backendRes = await fetch(url, {
    method: request.method,
    headers,
    body,
  });

  const resHeaders = new Headers();
  for (const key of FORWARD_RES_HEADERS) {
    const value = backendRes.headers.get(key);
    if (value) {resHeaders.set(key, value);}
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
