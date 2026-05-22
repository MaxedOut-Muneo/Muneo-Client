'use client';

import { type ReactNode, useId } from 'react';
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

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.backdrop} role="presentation">
        <section
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
