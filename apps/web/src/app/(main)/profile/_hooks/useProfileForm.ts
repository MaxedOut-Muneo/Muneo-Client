'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { isApiError } from '@/api/errors';
import { updateMeLocal, updateMeSocial } from '@/api/user';
import { applyValidationErrors } from '@/lib/forms/applyValidationErrors';
import { profileUpdateSchema, type ProfileUpdateFormValues } from '@/lib/validations/profile';
import { type ProfileUser } from '../_types/profile.types';

const FIELD_MAP: Partial<Record<string, keyof ProfileUpdateFormValues>> = {
  name: 'name',
  phoneNumber: 'phone',
  birthDate: 'birth',
  newPassword: 'password',
  newPasswordConfirm: 'passwordConfirm',
};

export const useProfileForm = (user: ProfileUser) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileUpdateFormValues>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: user.name,
      birth: user.birth,
      phone: user.phone,
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updated =
        user.signupType === 'self'
          ? await updateMeLocal({
              email: user.email,
              name: data.name,
              phoneNumber: data.phone,
              birthDate: data.birth,
              ...(data.password ? { newPassword: data.password, newPasswordConfirm: data.passwordConfirm } : {}),
            })
          : await updateMeSocial({
              name: data.name,
              phoneNumber: data.phone,
              birthDate: data.birth,
            });
      reset({
        name: updated.name,
        birth: updated.birthDate,
        phone: updated.phoneNumber,
        password: '',
        passwordConfirm: '',
      });
      router.refresh();
    } catch (e) {
      if (applyValidationErrors(setError, e, FIELD_MAP)) {
        return;
      }
      if (isApiError(e)) {
        setError('root', { message: e.message });
      } else {
        setError('root', { message: '저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
      }
    }
  });

  return {
    register,
    errors,
    isSubmitting,
    onSubmit,
  };
};
