'use client';

import { type ReactNode, useEffect, useId, useRef } from 'react';
import { Button } from '../Button';
import { Portal } from '../Portal';
import * as styles from './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  title: ReactNode;
  subtitle?: ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
  className?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const Modal = ({
  isOpen,
  title,
  subtitle,
  cancelLabel = '취소',
  confirmLabel = '확인',
  onCancel,
  onConfirm,
  className,
}: ModalProps) => {
  const titleId = useId();
  const subtitleId = useId();
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusables[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
        return;
      }
      if (event.key !== 'Tab' || focusables.length === 0) {
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.backdrop} role="presentation">
        <section
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={subtitle ? subtitleId : undefined}
          className={[styles.modal, className].filter(Boolean).join(' ')}
        >
          <div className={styles.inner}>
            <div className={styles.texts}>
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
              {subtitle && (
                <p id={subtitleId} className={styles.subtitle}>
                  {subtitle}
                </p>
              )}
            </div>

            <div className={styles.actions}>
              <Button variant="outlineSecondary" size="sm" className={styles.actionButton} onClick={onCancel}>
                {cancelLabel}
              </Button>
              <Button variant="primary" size="sm" className={styles.actionButton} onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Portal>
  );
};
