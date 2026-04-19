'use client';

import { useState } from 'react';
import { LoginModal } from '../LoginModal';

interface LoginSectionProps {
  onLogoClick?: () => void;
  onClose?: () => void;
  onKakaoLogin?: () => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}

export const LoginSection = ({ onLogoClick, onClose, onKakaoLogin, onForgotPassword, onSignUp }: LoginSectionProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setEmailError(undefined);
    setPasswordError(undefined);
    setIsLoading(true);
    try {
      // NOTE: 로그인 API 연동
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginModal
      email={email}
      password={password}
      emailError={emailError}
      passwordError={passwordError}
      isLoading={isLoading}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onLogin={handleLogin}
      onLogoClick={onLogoClick}
      onClose={onClose}
      onKakaoLogin={onKakaoLogin}
      onForgotPassword={onForgotPassword}
      onSignUp={onSignUp}
    />
  );
};
