'use client';

import { useRouter } from 'next/navigation';
import { LoginSection } from '../_components/LoginSection';

const LoginPage = () => {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
      }}
    >
      <LoginSection onLogoClick={() => router.push('/')} onSignUp={() => router.push('/signup')} />
    </div>
  );
};

export default LoginPage;
