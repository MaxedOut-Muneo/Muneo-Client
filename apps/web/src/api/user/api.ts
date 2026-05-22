import 'server-only';
import { cache } from 'react';
import { type AuthUser } from '@/types/auth';
import { serverFetch } from '../server-client';
import { type ApiSuccessResponse } from '../types';

export const getServerMe = cache(async (): Promise<AuthUser> => {
  const res = await serverFetch<ApiSuccessResponse<AuthUser>>('api/v1/users/me');
  return res.result;
});
