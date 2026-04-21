'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { selectButtonRecipe } from './SelectButton.css';

export interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: ReactNode;
}

export const SelectButton = ({
  selected = false,
  children,
  className,
  type = 'button',
  ...props
}: SelectButtonProps) => {
  return (
    <button
      type={type}
      className={`${selectButtonRecipe({ selected })}${className ? ` ${className}` : ''}`}
      aria-pressed={selected}
      {...props}
    >
      {children}
    </button>
  );
};
