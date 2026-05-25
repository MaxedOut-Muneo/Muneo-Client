import { type AuthProvider, type UserRole } from '../auth/types';

export interface UserDetail {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
  authProvider: AuthProvider;
  profileCompleted: boolean;
  emailVerified: boolean;
  deleted: boolean;
  role: UserRole;
}

export interface UserListParams {
  page?: number;
  size?: number;
  keyword?: string;
  role?: UserRole;
  deleted?: boolean;
  authProvider?: AuthProvider;
  emailVerified?: boolean;
  profileCompleted?: boolean;
}

export interface UpdateUserRequest {
  email: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
}

export interface ChangeRoleRequest {
  role: UserRole;
}
