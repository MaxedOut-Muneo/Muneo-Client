import 'server-only';
import { cookies } from 'next/headers';
import { toApiError } from './errors';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');
}

interface ServerFetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

export const serverFetch = async <T>(path: string, options: ServerFetchOptions = {}): Promise<T> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { body, headers: customHeaders, ...rest } = options;

  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (cookieHeader) {
    headers.set('Cookie', cookieHeader);
  }
  if (customHeaders) {
    new Headers(customHeaders).forEach((value, key) => headers.set(key, value));
  }

  const res = await fetch(`${BASE_URL}/${path}`, {
    ...rest,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const err = new Error(`API Error: ${res.status}`);
    Object.assign(err, { status: res.status, body: errorBody });
    throw toApiError(err);
  }

  return res.json() as Promise<T>;
};
