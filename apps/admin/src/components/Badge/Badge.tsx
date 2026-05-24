import { type ReactNode } from 'react';
import * as styles from './Badge.css';

export type BadgeTone = 'primary' | 'neutral' | 'success' | 'danger';

interface BadgeProps {
  tone: BadgeTone;
  children: ReactNode;
  className?: string;
}

export const Badge = ({ tone, children, className }: BadgeProps) => (
  <span className={[styles.badge, styles.tone[tone], className].filter(Boolean).join(' ')}>{children}</span>
);
