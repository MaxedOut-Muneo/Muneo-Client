import * as styles from './Toast.css';

export type ToastTone = 'default' | 'success' | 'error' | 'warning';

interface ToastProps {
  message: string;
  tone: ToastTone;
  onDismiss: () => void;
}

export const Toast = ({ message, tone, onDismiss }: ToastProps) => (
  <div className={`${styles.toast} ${styles.tone[tone]}`} role="status" aria-live="polite">
    <span className={styles.message}>{message}</span>
    <button type="button" className={styles.closeButton} onClick={onDismiss} aria-label="닫기">
      ×
    </button>
  </div>
);
