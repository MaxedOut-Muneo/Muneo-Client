'use client';

import { Button, CloseRoundFill, TextField } from '@muneo/design-system';
import { useId } from 'react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { type SignupFormValues } from '@/lib/validations/auth';
import { AuthModalHeader } from '../AuthModalHeader';
import * as styles from './SignupModal.css';

export interface SignupModalProps {
  className?: string;
  register: UseFormRegister<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  isLoading?: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onLogin?: () => void;
  onLogoClick?: () => void;
  onClose?: () => void;
}

const FIELDS = [
  { name: 'email', label: '이메일', type: 'email', placeholder: 'name@example.com', autoComplete: 'email' },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    autoComplete: 'new-password',
  },
  {
    name: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    autoComplete: 'new-password',
  },
  {
    name: 'name',
    label: '이름',
    type: 'text',
    placeholder: '텍스트를 입력하세요',
    autoComplete: 'name',
    maxLength: 20,
  },
  { name: 'phone', label: '연락처', type: 'tel', placeholder: '연락처를 입력해주세요', autoComplete: 'tel' },
  { name: 'birthDate', label: '생년월일', type: 'text', placeholder: 'YYYY-MM-DD', autoComplete: 'bday' },
] as const satisfies ReadonlyArray<{
  name: keyof SignupFormValues;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  maxLength?: number;
}>;

export const SignupModal = ({
  className,
  register,
  errors,
  isLoading,
  onSubmit,
  onLogin,
  onLogoClick,
  onClose,
}: SignupModalProps) => {
  const formId = useId();

  return (
    <div className={[styles.modal, className].filter(Boolean).join(' ')}>
      {onClose && (
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="닫기">
          <CloseRoundFill />
        </button>
      )}
      <form className={styles.inner} onSubmit={onSubmit} noValidate>
        <div className={styles.upper}>
          <AuthModalHeader onLogoClick={onLogoClick} />

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

        <div className={styles.actionSection}>
          <Button type="submit" variant="primary" className={styles.fullWidth} disabled={isLoading}>
            가입하기
          </Button>

          <div className={styles.footerRow}>
            <span className={styles.loginText}>이미 회원이신가요?</span>
            <div className={styles.footerDivider} />
            <button type="button" className={styles.loginLink} onClick={onLogin}>
              로그인
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
