import { Suspense } from 'react';
import { getServerEstimates, getServerRiskDetections, type EstimateItem, type RiskItem } from '@/api/history';
import { getServerMe } from '@/api/user/server';
import { HistoryContent } from './_components/HistoryContent/HistoryContent';
import { type AnalysisStatus, type HistoryRow, type RiskStatus } from './_types/history.types';
import * as styles from './page.css';

const toDate = (iso: string) => iso.slice(0, 10);

const buildHistoryRows = (estimates: EstimateItem[], risks: RiskItem[]): HistoryRow[] => {
  interface Entry {
    createdAt: string;
    row: HistoryRow;
  }

  const estimateEntries: Entry[] = estimates.map((item) => ({
    createdAt: item.created_at,
    row: {
      id: item.id,
      date: toDate(item.created_at),
      analysisType: '가견적서 생성',
      constructionType: `${item.input.공간유형} ${item.input.평수}평`,
      vendor: '—',
      risk: { type: 'none' } as RiskStatus,
      status: '완료' as AnalysisStatus,
    },
  }));

  const riskEntries: Entry[] = risks.map((item) => {
    const total = item.result.report.summary.total_risk_items;
    const missing = item.result.report.summary.chips.누락;
    const risk: RiskStatus =
      total > 0 ? { type: 'danger', label: `누락 ${missing}건` } : { type: 'safe', label: '정상' };
    return {
      createdAt: item.created_at,
      row: {
        id: item.id,
        date: toDate(item.created_at),
        analysisType: '리스크 진단',
        constructionType: `${item.input.spaceType} ${item.input.pyeong}평`,
        vendor: item.input.companyName,
        risk,
        status: '완료' as AnalysisStatus,
      },
    };
  });

  return [...estimateEntries, ...riskEntries]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((entry) => entry.row);
};

const HistoryPage = async () => {
  const user = await getServerMe();
  const [estimates, risks] = await Promise.all([getServerEstimates(user.id), getServerRiskDetections(user.id)]);
  const rows = buildHistoryRows(estimates, risks);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>분석 이력</h1>
        <Suspense fallback={null}>
          <HistoryContent rows={rows} />
        </Suspense>
      </div>
    </div>
  );
};

export default HistoryPage;
