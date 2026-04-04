'use client';

import { type RecipeVariants } from '@vanilla-extract/recipes';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { buttonRecipe } from './Button.css';

type ButtonVariants = NonNullable<RecipeVariants<typeof buttonRecipe>>;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  children: ReactNode;
}

export const Button = ({ variant, size, children, className, ...props }: ButtonProps) => {
  return (
    <button className={`${buttonRecipe({ variant, size })}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </button>
  );
};
