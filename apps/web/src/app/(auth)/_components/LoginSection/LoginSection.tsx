'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAuthApiError, login } from '@/api/auth';
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth';
import { useAuthStore } from '@/store/authStore';
import { LoginModal } from '../LoginModal';

interface LoginSectionProps {
  onLogoClick?: () => void;
  onClose?: () => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}

export const LoginSection = ({ onLogoClick, onClose, onForgotPassword, onSignUp }: LoginSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const user = await login(data);
      setUser(user);
      router.push('/home');
    } catch (e) {
      if (isAuthApiError(e) && e.code === 'INVALID_LOGIN_INFO') {
        setError('password', { message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
      } else {
        setError('password', { message: '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
      }
    } finally {
      setIsLoading(false);
    }
  });

  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <LoginModal
      register={register}
      errors={errors}
      isLoading={isLoading}
      onSubmit={onSubmit}
      onLogoClick={onLogoClick}
      onClose={onClose}
      onKakaoLogin={handleKakaoLogin}
      onForgotPassword={onForgotPassword}
      onSignUp={onSignUp}
    />
  );
};
