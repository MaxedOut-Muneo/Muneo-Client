import { type AuthApiError, type AuthUser, type LoginRequest, type SignupRequest } from '@/types/auth';
import { client } from './client';

interface ApiSuccessResponse<T> {
  success: true;
  result: T;
}

function isClientError(e: unknown): e is Error & { status: number; body: unknown } {
  return e instanceof Error && 'status' in e && 'body' in e;
}

export function isAuthApiError(e: unknown): e is AuthApiError {
  return isClientError(e) && typeof (e.body as Record<string, unknown>)?.code === 'string';
}

function toAuthApiError(e: unknown): AuthApiError {
  if (isClientError(e) && e.body !== null && typeof e.body === 'object') {
    const body = e.body as Record<string, unknown>;
    return {
      code: typeof body.code === 'string' ? body.code : 'UNKNOWN',
      error: body.error as AuthApiError['error'],
    };
  }
  return { code: 'UNKNOWN' };
}

export const signup = async (data: SignupRequest): Promise<AuthUser> => {
  try {
    const res = await client.post('api/v1/users/signup', { json: data }).json<ApiSuccessResponse<AuthUser>>();
    return res.result;
  } catch (e) {
    throw toAuthApiError(e);
  }
};

export const login = async (data: LoginRequest): Promise<AuthUser> => {
  try {
    const res = await client.post('api/v1/users/login', { json: data }).json<ApiSuccessResponse<AuthUser>>();
    return res.result;
  } catch (e) {
    throw toAuthApiError(e);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await client.post('api/v1/users/logout');
  } catch (e) {
    throw toAuthApiError(e);
  }
};

export const refresh = async (): Promise<AuthUser> => {
  try {
    const res = await client.post('api/v1/auth/refresh').json<ApiSuccessResponse<AuthUser>>();
    return res.result;
  } catch (e) {
    throw toAuthApiError(e);
  }
};
