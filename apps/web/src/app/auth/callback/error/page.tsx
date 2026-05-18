'use client';

import { Button } from '@muneo/design-system';
import { useRouter, useSearchParams } from 'next/navigation';

const SocialLoginErrorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        backgroundColor: '#f3f4f6',
      }}
    >
      <p style={{ fontSize: '16px', color: '#374151', textAlign: 'center' }}>
        {reason ?? '카카오 로그인 중 오류가 발생했습니다.'}
      </p>
      <Button variant="primary" onClick={() => router.push('/login')}>
        다시 로그인하기
      </Button>
    </div>
  );
};

export default SocialLoginErrorPage;
