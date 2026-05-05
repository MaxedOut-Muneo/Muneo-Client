'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { SignupSection } from '@/app/(auth)/_components/SignupSection';
import { useModalBackdrop } from '@/hooks/useModalBackdrop';
import * as styles from './page.css';

export default function SignupModalPage() {
  const router = useRouter();

  const handleClose = useCallback(() => router.back(), [router]);
  const handleLogin = useCallback(() => router.replace('/login'), [router]);

  const { dialogRef, backdropProps } = useModalBackdrop(handleClose);

  return (
    <div className={styles.backdrop} {...backdropProps}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="회원가입" className={styles.modalWrapper}>
        <SignupSection onLogoClick={handleClose} onClose={handleClose} onLogin={handleLogin} />
      </div>
    </div>
  );
}
