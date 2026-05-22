'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isApiError } from '@/api/errors';
import { signup } from '@/api/user';
import { useViewTransitionRouter } from '@/hooks/useViewTransitionRouter';
import { signupSchema, type SignupFormValues } from '@/lib/validations/auth';

const FIELD_MAP: Record<string, keyof SignupFormValues> = {
  phoneNumber: 'phone',
  email: 'email',
  password: 'password',
  passwordConfirm: 'passwordConfirm',
  name: 'name',
  birthDate: 'birthDate',
};

export const useSignupForm = () => {
  const router = useRouter();
  const { push } = useViewTransitionRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await signup({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        name: data.name,
        phoneNumber: data.phone,
        birthDate: data.birthDate,
      });
      push('/home');
      router.refresh();
    } catch (e) {
      if (isApiError(e) && e.code === 'VALIDATION_FAILED' && typeof e.error === 'object' && e.error !== null) {
        const fieldErrors = e.error as Record<string, string>;
        Object.entries(fieldErrors).forEach(([apiField, message]) => {
          const formField = FIELD_MAP[apiField];
          if (formField) {
            setError(formField, { message });
          } else {
            setError('email', { message });
          }
        });
      } else {
        setError('email', { message: '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
      }
    } finally {
      setIsLoading(false);
    }
  });

  return {
    register,
    errors,
    isLoading,
    onSubmit,
  };
};
