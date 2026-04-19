'use client';

import { Button, CloseRoundFill, KakaoIcon, Logo, TextField } from '@muneo/design-system';
import { TAGLINE } from '@/constants/app';
import * as styles from './LoginModal.css';

export interface LoginModalProps {
  className?: string;
  email: string;
  password: string;
  emailError?: string;
  passwordError?: string;
  isLoading?: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin: () => void;
  onKakaoLogin?: () => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onLogoClick?: () => void;
  onClose?: () => void;
}

export const LoginModal = ({
  className,
  email,
  password,
  emailError,
  passwordError,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onKakaoLogin,
  onForgotPassword,
  onSignUp,
  onLogoClick,
  onClose,
}: LoginModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className={[styles.modal, className].filter(Boolean).join(' ')}>
      {onClose && (
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="닫기">
          <CloseRoundFill />
        </button>
      )}
      <form className={styles.inner} onSubmit={handleSubmit}>
        <div className={styles.upper}>
          <div className={styles.logoSection}>
            <span className={styles.tagline}>{TAGLINE}</span>
            <button type="button" className={styles.logoButton} onClick={onLogoClick} aria-label="홈으로 이동">
              <Logo width={118} height={38} />
            </button>
          </div>

          <div className={styles.formSection}>
            <TextField
              label="이메일"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              error={emailError}
              autoComplete="email"
            />
            <TextField
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              error={passwordError}
              autoComplete="current-password"
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

          <div className={styles.signupRow}>
            <span className={styles.signupText}>계정이 없으신가요?</span>
            <div className={styles.signupDivider} />
            <button type="button" className={styles.signupLink} onClick={onSignUp}>
              회원가입
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
