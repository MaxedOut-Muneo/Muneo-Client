'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { LoginSection } from '@/app/(auth)/_components/LoginSection';
import { useModalBackdrop } from '@/hooks/useModalBackdrop';
import * as styles from './page.css';

export default function LoginModalPage() {
  const router = useRouter();

  const handleClose = useCallback(() => router.back(), [router]);
  const handleSignUp = useCallback(() => router.replace('/signup'), [router]);

  const { dialogRef, backdropProps } = useModalBackdrop(handleClose);

  return (
    <div className={styles.backdrop} {...backdropProps}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="로그인" className={styles.modalWrapper}>
        <LoginSection onLogoClick={handleClose} onClose={handleClose} onSignUp={handleSignUp} />
      </div>
    </div>
  );
}
