import { type ReactNode } from 'react';
import * as styles from './Card.css';

export type CardVariant = 'default' | 'danger';

interface CardProps {
  variant?: CardVariant;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Card = ({ variant = 'default', title, children, className }: CardProps) => (
  <section className={[styles.card, styles.variant[variant], className].filter(Boolean).join(' ')}>
    {title && <h2 className={`${styles.title} ${styles.titleColor[variant]}`}>{title}</h2>}
    {children}
  </section>
);
