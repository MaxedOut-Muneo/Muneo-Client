'use client';

import { CaretDownSmIcon } from '@muneo/design-system';
import { useRouter } from 'next/navigation';
import { TransitionLink } from '@/components/TransitionLink';
import { type HistoryRow, type RiskStatus } from '../../_types/home.types';
import * as styles from './HistoryTable.css';

interface HistoryTableProps {
  rows: HistoryRow[];
}

const COLUMNS = ['날짜', '분석 유형', '공사 유형', '리스크'] as const;

const formatDate = (dateStr: string) => {
  const [, month, day] = dateStr.split('-');
  return `${parseInt(month)}월 ${parseInt(day)}일`;
};

const RiskBadge = ({ risk }: { risk: RiskStatus }) => {
  if (risk.type === 'danger') {
    return <span className={styles.riskDanger}>{risk.label}</span>;
  }
  if (risk.type === 'safe') {
    return <span className={styles.riskSafe}>{risk.label}</span>;
  }
  return <span className={styles.riskNone}>—</span>;
};

const AnalysisTypeBadge = ({ label }: { label: string }) => {
  const isRisk = label === '리스크 진단';
  return <span className={isRisk ? styles.analysisRisk : styles.analysisEstimate}>{label}</span>;
};

export const HistoryTable = ({ rows }: HistoryTableProps) => {
  const router = useRouter();
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          최근 분석 이력
          <span className={styles.cardTitleCount}>{rows.length}</span>
        </h3>
        <TransitionLink href="/history" className={styles.viewAllLink}>
          전체 이력 보기
          <CaretDownSmIcon width={24} height={24} style={{ transform: 'rotate(-90deg)' }} />
        </TransitionLink>
      </div>
      <table className={styles.table}>
        <colgroup>
          <col className={styles.colDate} />
          <col className={styles.colType} />
          <col className={styles.colConstruction} />
          <col className={styles.colRisk} />
          <col className={styles.colAction} />
        </colgroup>
        <thead className={styles.thead}>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col} className={styles.th}>
                <span className={styles.thInner}>
                  {col}
                  <CaretDownSmIcon width={24} height={24} />
                </span>
              </th>
            ))}
            <th className={styles.th} />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={styles.tr}
              role="link"
              tabIndex={0}
              onClick={() => router.push(`/history/${row.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  router.push(`/history/${row.id}`);
                }
              }}
            >
              <td className={styles.tdDate}>{formatDate(row.date)}</td>
              <td className={styles.tdType}>
                <AnalysisTypeBadge label={row.analysisType} />
              </td>
              <td className={styles.tdConstruction}>{row.constructionType}</td>
              <td className={styles.tdRisk}>
                <RiskBadge risk={row.risk} />
              </td>
              <td className={styles.tdAction}>
                <CaretDownSmIcon width={14} height={14} style={{ transform: 'rotate(-90deg)' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
