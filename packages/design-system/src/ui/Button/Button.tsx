'use client';

import { type RecipeVariants } from '@vanilla-extract/recipes';
import { type ComponentPropsWithRef, type ElementType, type ReactNode } from 'react';
import { buttonRecipe } from './Button.css';

type ButtonVariants = NonNullable<RecipeVariants<typeof buttonRecipe>>;

type ButtonOwnProps<E extends ElementType> = {
  as?: E;
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  children: ReactNode;
  className?: string;
};

export type ButtonProps<E extends ElementType = 'button'> = ButtonOwnProps<E> &
  Omit<ComponentPropsWithRef<E>, keyof ButtonOwnProps<E>>;

export const Button = <E extends ElementType = 'button'>({
  as,
  variant,
  size,
  children,
  className,
  ...props
}: ButtonProps<E>) => {
  const Component = as ?? 'button';
  type ButtonType = 'button' | 'reset' | 'submit';
  const type = Component === 'button' ? ((props as { type?: ButtonType }).type ?? 'button') : undefined;

  return (
    <Component
      {...props}
      type={type}
      className={[buttonRecipe({ variant, size }), className].filter(Boolean).join(' ')}
    >
      {children}
    </Component>
  );
};
