'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useRef } from 'react';
import { LoginSection } from '@/app/(auth)/_components/LoginSection';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import * as styles from './page.css';

export default function LoginModalPage() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const mouseDownTarget = useRef<EventTarget | null>(null);

  useBodyScrollLock(true);
  useFocusTrap(dialogRef, true);

  const handleClose = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          mouseDownTarget.current = e.target;
        }
      }}
      onClick={(e) => {
        if (mouseDownTarget.current === e.currentTarget && e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="로그인"
        className={styles.modalWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <LoginSection onLogoClick={handleClose} onClose={handleClose} />
      </div>
    </div>
  );
}
