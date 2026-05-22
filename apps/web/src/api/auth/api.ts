import { type AuthUser } from '@/types/auth';
import { client } from '../client';
import { toApiError } from '../errors';
import { type ApiSuccessResponse } from '../types';
import { type KakaoLoginUrl, type SocialSignupRequest } from './types';

export const getKakaoLoginUrl = async (): Promise<KakaoLoginUrl> => {
  try {
    const res = await client.get('api/v1/auth/oauth/kakao').json<ApiSuccessResponse<KakaoLoginUrl>>();
    return res.result;
  } catch (e) {
    throw toApiError(e);
  }
};

export const socialSignup = async (data: SocialSignupRequest): Promise<AuthUser> => {
  try {
    const res = await client.post('api/v1/auth/social/signup', { json: data }).json<ApiSuccessResponse<AuthUser>>();
    return res.result;
  } catch (e) {
    throw toApiError(e);
  }
};
