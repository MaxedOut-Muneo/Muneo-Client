'use client';

import { Button } from '@muneo/design-system';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const REASON_MESSAGES: Record<string, string> = {
  SOCIAL_LOGIN_FAILED: '카카오 로그인에 실패했습니다.',
  ACCOUNT_LOCKED: '계정이 잠겨 있습니다. 고객센터에 문의해주세요.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};
const DEFAULT_MESSAGE = '카카오 로그인 중 오류가 발생했습니다.';

const ErrorContent = () => {
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
        {(reason && REASON_MESSAGES[reason]) ?? DEFAULT_MESSAGE}
      </p>
      <Button variant="primary" onClick={() => router.push('/login')}>
        다시 로그인하기
      </Button>
    </div>
  );
};

const SocialLoginErrorPage = () => (
  <Suspense>
    <ErrorContent />
  </Suspense>
);

export default SocialLoginErrorPage;
