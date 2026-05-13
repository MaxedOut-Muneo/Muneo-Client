import { type EstimateSummary } from '../../_types/history.types';
import * as styles from './EstimateDetailView.css';

interface EstimateDetailViewProps {
  data: EstimateSummary;
}

export const EstimateDetailView = ({ data }: EstimateDetailViewProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>가견적 결과</h1>
        <span className={styles.meta}>
          {data.constructionType} · 분석일 {data.analyzedAt}
        </span>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>선택 공정</h2>
        <div className={styles.processList}>
          {data.selectedProcesses.map((process) => (
            <span key={process} className={styles.processBadge}>
              {process}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.totalCard}>
        <span className={styles.totalLabel}>예상 총 견적</span>
        <span className={styles.totalValue}>{data.totalEstimate}</span>
      </div>
    </div>
  );
};
