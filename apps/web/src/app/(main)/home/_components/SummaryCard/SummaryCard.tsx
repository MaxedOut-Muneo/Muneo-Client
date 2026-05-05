import { CaretDownIcon } from '@muneo/design-system';
import { type ReactNode } from 'react';
import * as styles from './SummaryCard.css';

interface SummaryCardProps {
  icon: ReactNode;
  label: string;
  count: number | string;
  danger?: boolean;
}

export function SummaryCard({ icon, label, count, danger = false }: SummaryCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        {icon}
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.right}>
        <span className={danger ? styles.countDanger : styles.count}>
          {typeof count === 'number' ? `${count}건` : count}
        </span>
        <span className={styles.arrow}>
          <CaretDownIcon width={24} height={24} style={{ transform: 'rotate(-90deg)' }} />
        </span>
      </div>
    </div>
  );
}
