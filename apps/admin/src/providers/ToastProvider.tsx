import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { Toast, type ToastTone } from '@/components/Toast';

interface ToastState {
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const HIDE_DELAY_MS = 3000;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback((message: string, tone: ToastTone = 'default') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast({ message, tone });
    timerRef.current = setTimeout(() => setToast(null), HIDE_DELAY_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} tone={toast.tone} onDismiss={dismiss} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
