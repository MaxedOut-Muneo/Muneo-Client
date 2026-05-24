import { type AuthUser } from '@/types/auth';
import { client } from '../client';
import { requestResult, requestVoid } from '../request';
import { type LoginRequest, type SignupRequest, type UpdateMeLocalRequest, type UpdateMeSocialRequest } from './types';

export const signup = (data: SignupRequest) =>
  requestResult<AuthUser>(() => client.post('api/v1/users/signup', { json: data }).json());

export const login = (data: LoginRequest) =>
  requestResult<AuthUser>(() => client.post('api/v1/users/login', { json: data }).json());

export const logout = () => requestVoid(() => client.post('api/v1/users/logout'));

export const refresh = () => requestResult<AuthUser>(() => client.post('api/v1/users/refresh').json());

export const updateMeLocal = (data: UpdateMeLocalRequest) =>
  requestResult<AuthUser>(() => client.patch('api/v1/users/me/local', { json: data }).json());

export const updateMeSocial = (data: UpdateMeSocialRequest) =>
  requestResult<AuthUser>(() => client.patch('api/v1/users/me/social', { json: data }).json());

export const deleteMe = () => requestVoid(() => client.delete('api/v1/users/me'));
