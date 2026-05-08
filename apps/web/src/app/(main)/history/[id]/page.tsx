import { notFound } from 'next/navigation';
import { TransitionLink } from '@/components/TransitionLink';
import { DiagnosisDetailView } from '../_components/DiagnosisDetailView/DiagnosisDetailView';
import { EstimateDetailView } from '../_components/EstimateDetailView/EstimateDetailView';
import { MOCK_DIAGNOSIS_DETAILS, MOCK_ESTIMATE_DETAILS } from '../_mocks/history-detail.mock';
import { MOCK_HISTORY_ROWS } from '../_mocks/history.mock';
import * as styles from './page.css';

export default async function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const row = MOCK_HISTORY_ROWS.find((r) => r.id === id);

  if (!row) {
    notFound();
  }

  const diagnosisDetail = MOCK_DIAGNOSIS_DETAILS[id];
  const estimateDetail = MOCK_ESTIMATE_DETAILS[id];

  if (row.analysisType === '리스크 진단' && !diagnosisDetail) {
    notFound();
  }
  if (row.analysisType !== '리스크 진단' && !estimateDetail) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <TransitionLink href="/history" className={styles.backButton}>
        ← 분석 이력
      </TransitionLink>
      <div className={styles.content}>
        {row.analysisType === '리스크 진단' ? (
          <DiagnosisDetailView result={diagnosisDetail!} />
        ) : (
          <EstimateDetailView data={estimateDetail!} />
        )}
      </div>
    </div>
  );
}
