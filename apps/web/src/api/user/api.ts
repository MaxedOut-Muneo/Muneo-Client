import { type AuthUser } from '@/types/auth';
import { client } from '../client';
import { toApiError } from '../errors';
import { type ApiSuccessResponse } from '../types';
import { type LoginRequest, type SignupRequest, type UpdateMeLocalRequest, type UpdateMeSocialRequest } from './types';

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

export const updateMeLocal = async (data: UpdateMeLocalRequest): Promise<AuthUser> => {
  try {
    const res = await client.patch('api/v1/users/me/local', { json: data }).json<ApiSuccessResponse<AuthUser>>();
    return res.result;
  } catch (e) {
    throw toApiError(e);
  }
};

export const updateMeSocial = async (data: UpdateMeSocialRequest): Promise<AuthUser> => {
  try {
    const res = await client.patch('api/v1/users/me/social', { json: data }).json<ApiSuccessResponse<AuthUser>>();
    return res.result;
  } catch (e) {
    throw toApiError(e);
  }
};

export const deleteMe = async (): Promise<void> => {
  try {
    await client.delete('api/v1/users/me');
  } catch (e) {
    throw toApiError(e);
  }
};
