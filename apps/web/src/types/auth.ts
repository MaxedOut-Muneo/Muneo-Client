export interface AuthUser {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
  authProvider: 'LOCAL' | 'KAKAO';
  profileCompleted: boolean;
  role: 'USER' | 'ADMIN';
}

export interface SignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SocialSignupRequest {
  ticket: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
}

export interface AuthApiError {
  code: string;
  error?: Record<string, string> | string;
}
