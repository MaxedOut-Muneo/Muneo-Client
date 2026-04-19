'use client';

import { Button, TriangleWarningIcon } from '@muneo/design-system';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <TriangleWarningIcon width={48} height={48} />
      <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>오류가 발생했습니다</h2>
      <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>일시적인 문제가 발생했습니다. 다시 시도해주세요.</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="primary" onClick={reset}>
          다시 시도
        </Button>
        <Button as="a" variant="outlineSecondaryStrong" href="/">
          홈으로
        </Button>
      </div>
    </div>
  );
}
