import { DellSquareIcon, DoneRingRoundFillIcon, TriangleWarningIcon } from '@muneo/design-system';
import { type ComponentProps } from 'react';
import { HistoryTable } from './_components/HistoryTable/HistoryTable';
import { SummaryCard } from './_components/SummaryCard/SummaryCard';
import { MOCK_GREETING_NAME, MOCK_HISTORY_ROWS, MOCK_SUMMARY_STATS } from './_mocks/home.mock';
import * as styles from './page.css';

const SUMMARY_CARDS: Array<ComponentProps<typeof SummaryCard>> = [
  {
    icon: <DellSquareIcon width={22} height={22} />,
    label: '그동안 생성한 가견적서',
    count: MOCK_SUMMARY_STATS.estimateCount,
  },
  {
    icon: <DoneRingRoundFillIcon width={22} height={22} />,
    label: '진단 완료한 견적',
    count: MOCK_SUMMARY_STATS.diagnosedCount,
  },
  {
    icon: <TriangleWarningIcon width={22} height={22} />,
    label: '리스크 발생 견적',
    count: MOCK_SUMMARY_STATS.riskCount,
    danger: true,
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.greetingSection}>
          <h1 className={styles.greetingTitle}>
            안녕하세요, <span className={styles.greetingName}>{MOCK_GREETING_NAME}</span> 님
          </h1>
          <p className={styles.greetingSubtitle}>오늘도 문어와 함께 현명한 의사 결정을 내리세요.</p>
        </div>

        <div className={styles.summaryRow}>
          {SUMMARY_CARDS.map((props) => (
            <SummaryCard key={props.label} {...props} />
          ))}
        </div>

        <HistoryTable rows={MOCK_HISTORY_ROWS} />
      </div>
    </div>
  );
}
