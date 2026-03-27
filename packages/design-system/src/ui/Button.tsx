'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <button data-variant={variant} {...props}>
      {children}
    </button>
  );
}
