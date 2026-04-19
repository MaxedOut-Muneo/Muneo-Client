'use client';

import { useRouter } from 'next/navigation';
import { LoginSection } from '../_components/LoginSection';

export default function LoginPage() {
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
      <LoginSection
        onLogoClick={() => router.push('/')}
        onForgotPassword={() => {}}
        onSignUp={() => router.push('/signup')}
      />
    </div>
  );
}
