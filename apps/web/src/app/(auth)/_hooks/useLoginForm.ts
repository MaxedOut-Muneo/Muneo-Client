'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getKakaoLoginUrl } from '@/api/auth';
import { isApiError } from '@/api/errors';
import { login } from '@/api/user';
import { useViewTransitionRouter } from '@/hooks/useViewTransitionRouter';
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth';

export const useLoginForm = () => {
  const router = useRouter();
  const { push } = useViewTransitionRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isKakaoLoading, setIsKakaoLoading] = useState(false);

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
      await login(data);
      push('/home');
      router.refresh();
    } catch (e) {
      if (isApiError(e) && e.code === 'INVALID_LOGIN_INFO') {
        setError('password', { message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
      } else {
        setError('password', { message: '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
      }
    } finally {
      setIsLoading(false);
    }
  });

  const handleKakaoLogin = async () => {
    setIsKakaoLoading(true);
    try {
      const { loginUrl } = await getKakaoLoginUrl();
      window.location.href = loginUrl;
    } catch (e) {
      console.error('카카오 로그인 URL 조회 실패', e);
      setIsKakaoLoading(false);
    }
  };

  return {
    register,
    errors,
    isLoading,
    isKakaoLoading,
    onSubmit,
    handleKakaoLogin,
  };
};
