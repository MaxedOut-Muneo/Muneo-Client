import { type RecipeVariants } from '@vanilla-extract/recipes';
import { type ReactNode } from 'react';
import * as styles from './StatusCard.css';

type CardVariants = NonNullable<RecipeVariants<typeof styles.cardRecipe>>;

export interface StatusCardProps {
  variant?: CardVariants['variant'];
  icon: ReactNode;
  label: string;
  value: string | number;
  className?: string;
}

export const StatusCard = ({ variant, icon, label, value, className }: StatusCardProps) => {
  return (
    <div className={[styles.cardRecipe({ variant }), className].filter(Boolean).join(' ')}>
      <div className={styles.inner}>
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.content}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{value}</span>
        </div>
      </div>
    </div>
  );
};
