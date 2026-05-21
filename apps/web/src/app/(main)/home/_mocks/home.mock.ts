import { type HistoryRow, type SummaryStats } from '../_types/home.types';

export const MOCK_GREETING_NAME = '김민수';

export const MOCK_SUMMARY_STATS: SummaryStats = {
  estimateCount: 3,
  diagnosedCount: 5,
  riskCount: 12,
};

export const MOCK_HISTORY_ROWS: HistoryRow[] = [
  { id: '1', date: '2026-04-15', analysisType: '리스크 진단', constructionType: '주거 32평 리모델링' },
  { id: '2', date: '2026-04-14', analysisType: '가견적서 생성', constructionType: '상업 20평 신규' },
  { id: '3', date: '2026-04-12', analysisType: '리스크 진단', constructionType: '주거 28평 리모델링' },
  { id: '4', date: '2026-04-10', analysisType: '가견적서 생성', constructionType: '주거 45평 전체' },
  { id: '5', date: '2026-04-05', analysisType: '리스크 진단', constructionType: '주거 32평 부분' },
];
