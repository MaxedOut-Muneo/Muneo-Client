'use client';

import { type ReactNode } from 'react';
import { chatBubbleRecipe } from './ChatBubble.css';

export interface ChatBubbleProps {
  variant: 'ai' | 'user';
  children: ReactNode;
  className?: string;
}

export const ChatBubble = ({ variant, children, className }: ChatBubbleProps) => {
  return <div className={`${chatBubbleRecipe({ variant })}${className ? ` ${className}` : ''}`}>{children}</div>;
};
