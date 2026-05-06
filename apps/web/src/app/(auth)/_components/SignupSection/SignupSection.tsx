'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signupSchema, type SignupFormValues } from '@/lib/validations/auth';
import { SignupModal } from '../SignupModal';

interface SignupSectionProps {
  onLogoClick?: () => void;
  onClose?: () => void;
  onLogin?: () => void;
}

export const SignupSection = ({ onLogoClick, onClose, onLogin }: SignupSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = handleSubmit(async () => {
    setIsLoading(true);
    try {
      // NOTE: 회원가입 API 연동
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
