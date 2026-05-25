import { client } from '../client';
import { requestResult } from '../request';
import { type LoginRequest, type User } from './types';

export const login = (data: LoginRequest) => requestResult<User>(client.post('/api/v1/admin/login', data));
