import { type HistoryRow } from '../_types/history.types';

export const MOCK_HISTORY_ROWS: HistoryRow[] = [
  {
    id: 5,
    date: '2026-04-15',
    analysisType: '리스크 진단',
    constructionType: '주거 32평 리모델링',
    vendor: 'A업체',
    risk: { type: 'danger', label: '누락 4건' },
    status: '완료',
  },
  {
    id: 4,
    date: '2026-04-14',
    analysisType: '가견적서 생성',
    constructionType: '상업 20평 신규',
    vendor: '—',
    risk: { type: 'none' },
    status: '완료',
  },
  {
    id: 3,
    date: '2026-04-12',
    analysisType: '리스크 진단',
    constructionType: '주거 28평 리모델링',
    vendor: 'B업체',
    risk: { type: 'danger', label: '누락 2건' },
    status: '완료',
  },
  {
    id: 2,
    date: '2026-04-10',
    analysisType: '가견적서 생성',
    constructionType: '주거 45평 전체',
    vendor: '—',
    risk: { type: 'none' },
    status: '완료',
  },
  {
    id: 1,
    date: '2026-04-05',
    analysisType: '리스크 진단',
    constructionType: '주거 32평 부분',
    vendor: 'D업체',
    risk: { type: 'safe', label: '정상' },
    status: '완료',
  },
];
