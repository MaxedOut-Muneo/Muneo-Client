'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAuthApiError, signup } from '@/api/auth';
import { signupSchema, type SignupFormValues } from '@/lib/validations/auth';
import { useAuthStore } from '@/store/authStore';
import { SignupModal } from '../SignupModal';

interface SignupSectionProps {
  onLogoClick?: () => void;
  onClose?: () => void;
  onLogin?: () => void;
}

export const SignupSection = ({ onLogoClick, onClose, onLogin }: SignupSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

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
      const user = await signup({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        name: data.name,
        phoneNumber: data.phone,
        birthDate: data.birthDate,
      });
      setUser(user);
      router.push('/home');
    } catch (e) {
      if (isAuthApiError(e) && e.code === 'VALIDATION_FAILED') {
        const fieldErrors = e.error as Record<string, string>;
        const fieldMap: Record<string, keyof SignupFormValues> = {
          phoneNumber: 'phone',
          email: 'email',
          password: 'password',
          passwordConfirm: 'passwordConfirm',
          name: 'name',
          birthDate: 'birthDate',
        };
        Object.entries(fieldErrors).forEach(([apiField, message]) => {
          const formField = fieldMap[apiField] ?? apiField;
          setError(formField as keyof SignupFormValues, { message });
        });
      } else {
        setError('email', { message: '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
      }
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <SignupModal
      register={register}
      errors={errors}
      isLoading={isLoading}
      onSubmit={onSubmit}
      onLogin={onLogin}
      onLogoClick={onLogoClick}
      onClose={onClose}
    />
  );
};
