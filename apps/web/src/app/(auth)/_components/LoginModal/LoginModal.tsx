'use client';

import { Button, CloseRoundFill, KakaoIcon, TextField } from '@muneo/design-system';
import Link from 'next/link';
import { useId } from 'react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { type LoginFormValues } from '@/lib/validations/auth';
import { AuthModalHeader } from '../AuthModalHeader';
import * as styles from './LoginModal.css';

export interface LoginModalProps {
  className?: string;
  register: UseFormRegister<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  isLoading?: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onKakaoLogin?: () => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onLogoClick?: () => void;
  onClose?: () => void;
}

export const LoginModal = ({
  className,
  register,
  errors,
  isLoading,
  onSubmit,
  onKakaoLogin,
  onForgotPassword,
  onSignUp,
  onLogoClick,
  onClose,
}: LoginModalProps) => {
  const emailId = useId();
  const passwordId = useId();

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
            <TextField
              id={emailId}
              label="이메일"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <TextField
              id={passwordId}
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />
            <button type="button" className={styles.forgotPassword} onClick={onForgotPassword}>
              비밀번호 찾기
            </button>
          </div>
        </div>

        <div className={styles.actionSection}>
          <Button type="submit" variant="primary" className={styles.fullWidth} disabled={isLoading}>
            로그인
          </Button>

          <div className={styles.divider}>
            <hr className={styles.dividerLine} />
            <span className={styles.dividerText}>또는</span>
            <hr className={styles.dividerLine} />
          </div>

          <button type="button" className={styles.kakaoButton} onClick={onKakaoLogin}>
            <KakaoIcon className={styles.kakaoIcon} />
            <span className={styles.kakaoText}>카카오 로그인</span>
          </button>

          <div className={styles.footerRow}>
            <span className={styles.signupText}>계정이 없으신가요?</span>
            <div className={styles.footerDivider} />
            {onSignUp ? (
              <button type="button" className={styles.signupLink} onClick={onSignUp}>
                회원가입
              </button>
            ) : (
              <Link href="/signup" className={styles.signupLink}>
                회원가입
              </Link>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
