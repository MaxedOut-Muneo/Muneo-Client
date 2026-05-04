import * as styles from './StatusSummaryCard.css';

type Variant = 'danger' | 'warning' | 'info';

interface StatusSummaryCardProps {
  variant: Variant;
  icon: string;
  label: string;
  count: number;
  hint: string;
}

const VARIANT_CLASS: Record<Variant, string> = {
  danger: styles.cardDanger,
  warning: styles.cardWarning,
  info: styles.cardInfo,
};

export function StatusSummaryCard({ variant, icon, label, count, hint }: StatusSummaryCardProps) {
  return (
    <div className={`${styles.card} ${VARIANT_CLASS[variant]}`}>
      <div className={styles.inner}>
        <span className={styles.iconWrapper}>{icon}</span>
        <div className={styles.texts}>
          <span className={styles.sublabel}>{label}</span>
          <span className={styles.count}>{count}건</span>
          <span className={styles.hint}>{hint}</span>
        </div>
      </div>
    </div>
  );
}
