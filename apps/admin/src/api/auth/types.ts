export const AUTH_PROVIDERS = ['LOCAL', 'KAKAO'] as const;
export type AuthProvider = (typeof AUTH_PROVIDERS)[number];

export const USER_ROLES = ['USER', 'ADMIN'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface User {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
  authProvider: AuthProvider;
  profileCompleted: boolean;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}
