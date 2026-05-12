import { type AnalysisStatus, type HistoryRow, type RiskStatus } from '../../_types/history.types';
import * as styles from './HistoryTable.css';

interface HistoryTableProps {
  rows: HistoryRow[];
  onRowClick?: (id: number) => void;
}

const COLUMNS = ['번호', '날짜', '분석 유형', '공사 유형', '업체', '리스크', '상태'] as const;

const getStatusClass = (status: AnalysisStatus) => {
  if (status === '완료') {
    return styles.statusComplete;
  }
  if (status === '진행중') {
    return styles.statusInProgress;
  }
  return styles.statusPending;
};

const RiskCell = ({ risk }: { risk: RiskStatus }) => {
  if (risk.type === 'danger') {
    return <span className={styles.riskDanger}>{risk.label}</span>;
  }
  if (risk.type === 'safe') {
    return <span className={styles.riskSafe}>{risk.label}</span>;
  }
  return <span className={styles.riskNone}>—</span>;
};

export const HistoryTable = ({ rows, onRowClick }: HistoryTableProps) => {
  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <colgroup>
          <col className={styles.colId} />
          <col className={styles.colDate} />
          <col className={styles.colAnalysisType} />
          <col className={styles.colConstructionType} />
          <col className={styles.colVendor} />
          <col className={styles.colRisk} />
          <col className={styles.colStatus} />
        </colgroup>
        <thead className={styles.thead}>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col} className={styles.th}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length} className={styles.emptyRow}>
                조회된 이력이 없습니다.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className={styles.tr}
                role="button"
                tabIndex={0}
                onClick={() => onRowClick?.(row.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onRowClick?.(row.id);
                  }
                }}
              >
                <td className={styles.td}>{row.id}</td>
                <td className={styles.td}>{row.date}</td>
                <td className={styles.tdAnalysisType}>{row.analysisType}</td>
                <td className={styles.td}>{row.constructionType}</td>
                <td className={styles.td}>{row.vendor}</td>
                <td className={styles.td}>
                  <RiskCell risk={row.risk} />
                </td>
                <td className={styles.td}>
                  <span className={getStatusClass(row.status)}>{row.status}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
