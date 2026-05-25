import { client } from '../client';
import { requestResult, requestVoid } from '../request';
import { type PagedResult } from '../types';
import { type ChangeRoleRequest, type UpdateUserRequest, type UserDetail, type UserListParams } from './types';

export const getUsers = (params: UserListParams) =>
  requestResult<PagedResult<UserDetail>>(client.get('/api/v1/admin/users', { params }));

export const getUser = (userId: number) => requestResult<UserDetail>(client.get(`/api/v1/admin/users/${userId}`));

export const updateUser = (userId: number, data: UpdateUserRequest) =>
  requestResult<UserDetail>(client.patch(`/api/v1/admin/users/${userId}`, data));

export const deleteUser = (userId: number) => requestVoid(client.delete(`/api/v1/admin/users/${userId}`));

export const restoreUser = (userId: number) =>
  requestResult<UserDetail>(client.patch(`/api/v1/admin/users/${userId}/restore`));

export const changeUserRole = (userId: number, data: ChangeRoleRequest) =>
  requestResult<UserDetail>(client.patch(`/api/v1/admin/users/${userId}/role`, data));
