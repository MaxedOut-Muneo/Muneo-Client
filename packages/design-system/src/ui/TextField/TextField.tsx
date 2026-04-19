'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import * as styles from './TextField.css';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  suffix?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, startIcon, endIcon, suffix, className, id, disabled, ...props }, ref) => {
    const containerClass = [
      styles.inputContainer,
      error ? styles.inputContainerError : '',
      disabled ? styles.inputContainerDisabled : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    const inputClass = [styles.input, suffix ? styles.inputRight : ''].filter(Boolean).join(' ');

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div className={containerClass}>
          {startIcon && <span className={styles.iconWrapper}>{startIcon}</span>}
          <input ref={ref} id={id} disabled={disabled} className={inputClass} {...props} />
          {suffix && <span className={styles.suffixText}>{suffix}</span>}
          {endIcon && <span className={styles.iconWrapper}>{endIcon}</span>}
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
