'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth';
import { LoginModal } from '../LoginModal';

interface LoginSectionProps {
  onLogoClick?: () => void;
  onClose?: () => void;
  onKakaoLogin?: () => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}

export const LoginSection = ({ onLogoClick, onClose, onKakaoLogin, onForgotPassword, onSignUp }: LoginSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async () => {
    setIsLoading(true);
    try {
      // NOTE: 로그인 API 연동
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <LoginModal
      register={register}
      errors={errors}
      isLoading={isLoading}
      onSubmit={onSubmit}
      onLogoClick={onLogoClick}
      onClose={onClose}
      onKakaoLogin={onKakaoLogin}
      onForgotPassword={onForgotPassword}
      onSignUp={onSignUp}
    />
  );
};
