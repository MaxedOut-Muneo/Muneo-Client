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
