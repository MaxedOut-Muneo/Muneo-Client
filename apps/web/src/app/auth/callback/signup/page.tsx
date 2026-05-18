'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@muneo/design-system';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';
import { isAuthApiError, socialSignup } from '@/api/auth';
import { AuthModalHeader } from '@/app/(auth)/_components/AuthModalHeader';
import { socialSignupSchema, type SocialSignupFormValues } from '@/lib/validations/auth';
import { useAuthStore } from '@/store/authStore';
import * as styles from './_components/socialSignup.css';

const FIELDS = [
  {
    name: 'name',
    label: '이름',
    type: 'text',
    placeholder: '텍스트를 입력하세요',
    autoComplete: 'name',
    maxLength: 20,
  },
  { name: 'phone', label: '연락처', type: 'tel', placeholder: '010-1234-5678', autoComplete: 'tel' },
  { name: 'birthDate', label: '생년월일', type: 'text', placeholder: 'YYYY-MM-DD', autoComplete: 'bday' },
] as const satisfies ReadonlyArray<{
  name: keyof SocialSignupFormValues;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  maxLength?: number;
}>;

const SocialSignupContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ticket = searchParams.get('ticket');
  const setUser = useAuthStore((state) => state.setUser);
  const formId = useId();

  useEffect(() => {
    if (!ticket) {
      router.replace('/login');
    }
  }, [ticket, router]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SocialSignupFormValues>({
    resolver: zodResolver(socialSignupSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!ticket) {
      return;
    }
    try {
      const user = await socialSignup({ ticket, name: data.name, phoneNumber: data.phone, birthDate: data.birthDate });
      setUser(user);
      router.replace('/home');
    } catch (e) {
      if (isAuthApiError(e)) {
        if (e.code === 'SOCIAL_SIGNUP_TICKET_EXPIRED') {
          router.replace('/login');
        } else if (e.code === 'VALIDATION_FAILED' && typeof e.error === 'object' && e.error !== null) {
          const fieldMap: Record<string, keyof SocialSignupFormValues> = {
            name: 'name',
            phoneNumber: 'phone',
            birthDate: 'birthDate',
          };
          Object.entries(e.error as Record<string, string>).forEach(([apiField, message]) => {
            const formField = fieldMap[apiField];
            if (formField) {
              setError(formField, { message });
            }
          });
        } else {
          setError('name', { message: '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
        }
      } else {
        setError('name', { message: '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
      }
    }
  });

  if (!ticket) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <form className={styles.inner} onSubmit={onSubmit} noValidate>
          <div className={styles.upper}>
            <AuthModalHeader onLogoClick={() => router.push('/')} />
            <p className={styles.description}>카카오 계정으로 가입을 완료해주세요.</p>
            <div className={styles.formSection}>
              {FIELDS.map(({ name, label, ...fieldProps }) => (
                <TextField
                  key={name}
                  id={`${formId}-${name}`}
                  label={label}
                  error={errors[name]?.message}
                  {...fieldProps}
                  {...register(name)}
                />
              ))}
            </div>
          </div>
          <Button type="submit" variant="primary" className={styles.fullWidth} disabled={isSubmitting}>
            가입 완료
          </Button>
        </form>
      </div>
    </div>
  );
};

const SocialSignupPage = () => (
  <Suspense>
    <SocialSignupContent />
  </Suspense>
);

export default SocialSignupPage;
