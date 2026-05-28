import { type ReactNode } from 'react';
import * as styles from './SummaryCard.css';

interface SummaryCardProps {
  icon: ReactNode;
  label: string;
  count: number | string;
  danger?: boolean;
}

export const SummaryCard = ({ icon, label, count, danger = false }: SummaryCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        {icon}
        <span className={styles.label}>{label}</span>
      </div>
      <span className={danger ? styles.countDanger : styles.count}>
        {typeof count === 'number' ? `${count}건` : count}
      </span>
    </div>
  );
};
