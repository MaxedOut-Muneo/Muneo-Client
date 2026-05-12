import { type RecipeVariants } from '@vanilla-extract/recipes';
import { clsx } from 'clsx';
import { type ReactNode } from 'react';
import * as styles from './StatusCard.css';

type CardVariants = NonNullable<RecipeVariants<typeof styles.cardRecipe>>;

export interface StatusCardProps {
  variant?: CardVariants['variant'];
  icon: ReactNode;
  label: string;
  value: string | number;
  description?: string;
  highlight?: boolean;
  className?: string;
}

export const StatusCard = ({
  variant,
  icon,
  label,
  value,
  description,
  highlight = false,
  className,
}: StatusCardProps) => {
  return (
    <div className={clsx(styles.cardRecipe({ variant }), className)}>
      <div className={styles.inner}>
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.content}>
          <span className={highlight ? styles.labelHighlight : styles.label}>{label}</span>
          <span className={highlight ? styles.valueHighlight : styles.value}>{value}</span>
          {description && <span className={styles.description}>{description}</span>}
        </div>
      </div>
    </div>
  );
};
