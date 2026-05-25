import { type AuthProvider, type UserRole } from '@/api';

export const ROLE_LABEL: Record<UserRole, string> = {
  USER: '사용자',
  ADMIN: '관리자',
};

export const PROVIDER_LABEL: Record<AuthProvider, string> = {
  LOCAL: '이메일',
  KAKAO: '카카오',
};

export const formatPhone = (value: string) => {
  if (!value) {
    return '-';
  }
  if (value.includes('-')) {
    return value;
  }
  if (value.length === 11) {
    return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
  }
  return value;
};
