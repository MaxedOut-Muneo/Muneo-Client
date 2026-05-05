'use client';

import { useEffect, useRef } from 'react';
import { useBodyScrollLock } from './useBodyScrollLock';
import { useFocusTrap } from './useFocusTrap';

export const useModalBackdrop = (onClose: () => void) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const mouseDownTarget = useRef<EventTarget | null>(null);

  useBodyScrollLock(true);
  useFocusTrap(dialogRef, true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const backdropProps = {
    onMouseDown: (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        mouseDownTarget.current = e.target;
      }
    },
    onClick: (e: React.MouseEvent) => {
      if (mouseDownTarget.current === e.currentTarget && e.target === e.currentTarget) {
        onClose();
      }
    },
  };

  return { dialogRef, backdropProps };
};
