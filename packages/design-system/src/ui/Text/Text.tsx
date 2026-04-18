'use client';

import { type RecipeVariants } from '@vanilla-extract/recipes';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type ElementType } from 'react';
import { textRecipe } from './Text.css';

type TextVariants = NonNullable<RecipeVariants<typeof textRecipe>>;

type TextProps<T extends ElementType = 'p'> = {
  as?: T;
  variant?: TextVariants['variant'];
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant' | 'className'>;

export const Text = <T extends ElementType = 'p'>({ as, variant, className, ...props }: TextProps<T>) => {
  const Component = (as ?? 'p') as ElementType;
  return <Component className={clsx(textRecipe({ variant }), className)} {...props} />;
};
