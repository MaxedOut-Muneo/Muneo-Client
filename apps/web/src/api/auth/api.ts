import { type AuthUser } from '@/types/auth';
import { client } from '../client';
import { toApiError } from '../errors';
import { type ApiSuccessResponse } from '../types';
import { type KakaoLoginUrl, type LoginRequest, type SignupRequest, type SocialSignupRequest } from './types';

export const signup = async (data: SignupRequest): Promise<AuthUser> => {
  try {
    const res = await client.post('api/v1/users/signup', { json: data }).json<ApiSuccessResponse<AuthUser>>();
    return res.result;
  } catch (e) {
    throw toApiError(e);
  }
};

export const login = async (data: LoginRequest): Promise<AuthUser> => {
  try {
    const res = await client.post('api/v1/users/login', { json: data }).json<ApiSuccessResponse<AuthUser>>();
    return res.result;
  } catch (e) {
    throw toApiError(e);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await client.post('api/v1/users/logout');
  } catch (e) {
    throw toApiError(e);
  }
};

export const refresh = async (): Promise<AuthUser> => {
  try {
    const res = await client.post('api/v1/users/refresh').json<ApiSuccessResponse<AuthUser>>();
    return res.result;
  } catch (e) {
    throw toApiError(e);
  }
};

export const getKakaoLoginUrl = async (): Promise<KakaoLoginUrl> => {
  const res = await client.get('api/v1/auth/oauth/kakao').json<ApiSuccessResponse<KakaoLoginUrl>>();
  return res.result;
};

export const socialSignup = async (data: SocialSignupRequest): Promise<AuthUser> => {
  try {
    const res = await client.post('api/v1/auth/social/signup', { json: data }).json<ApiSuccessResponse<AuthUser>>();
    return res.result;
  } catch (e) {
    throw toApiError(e);
  }
};
