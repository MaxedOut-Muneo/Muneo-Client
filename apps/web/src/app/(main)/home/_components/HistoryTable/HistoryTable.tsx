import { CaretDownIcon, Text } from '@muneo/design-system';
import { type HistoryRow, type RiskStatus } from '../../home.types';
import * as styles from './HistoryTable.css';

interface HistoryTableProps {
  rows: HistoryRow[];
}

const COLUMNS = ['날짜', '분석 유형', '공사 유형', '리스크'] as const;

function RiskBadge({ risk }: { risk: RiskStatus }) {
  if (risk.type === 'danger') {return <span className={styles.riskDanger}>{risk.label}</span>;}
  if (risk.type === 'safe') {return <span className={styles.riskSafe}>{risk.label}</span>;}
  return <span className={styles.riskNone}>—</span>;
}

function AnalysisTypeBadge({ label }: { label: string }) {
  const isRisk = label === '리스크 진단';
  return <span className={isRisk ? styles.analysisRisk : styles.analysisEstimate}>{label}</span>;
}

export function HistoryTable({ rows }: HistoryTableProps) {
  return (
    <div className={styles.card}>
      <Text as="h3" className={styles.cardTitle}>
        최근 분석 이력
      </Text>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col} className={styles.th}>
                <span className={styles.thInner}>
                  {col}
                  <CaretDownIcon width={16} height={16} />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className={styles.tr}>
              <td className={styles.tdDate}>{row.date}</td>
              <td className={styles.tdType}>
                <AnalysisTypeBadge label={row.analysisType} />
              </td>
              <td className={styles.tdConstruction}>{row.constructionType}</td>
              <td className={styles.tdRisk}>
                <RiskBadge risk={row.risk} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
