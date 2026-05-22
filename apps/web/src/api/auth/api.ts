import { type AuthUser } from '@/types/auth';
import { client } from '../client';
import { requestResult } from '../request';
import { type KakaoLoginUrl, type SocialSignupRequest } from './types';

export const getKakaoLoginUrl = () => requestResult<KakaoLoginUrl>(() => client.get('api/v1/auth/oauth/kakao').json());

export const socialSignup = (data: SocialSignupRequest) =>
  requestResult<AuthUser>(() => client.post('api/v1/auth/social/signup', { json: data }).json());
