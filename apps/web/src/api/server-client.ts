import 'server-only';
import { cookies } from 'next/headers';
import { toApiError } from './errors';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

interface ServerFetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

export const serverFetch = async <T>(path: string, options: ServerFetchOptions = {}): Promise<T> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { body, headers: customHeaders, ...rest } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    ...(customHeaders as Record<string, string> | undefined),
  };

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
