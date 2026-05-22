import { type HistoryRow } from '../_types/history.types';

export const ANALYSIS_TYPE_FILTERS = ['all', 'risk', 'estimate'] as const;
export type AnalysisTypeFilter = (typeof ANALYSIS_TYPE_FILTERS)[number];

export const isAnalysisTypeFilter = (value: string | null | undefined): value is AnalysisTypeFilter =>
  value != null && (ANALYSIS_TYPE_FILTERS as readonly string[]).includes(value);

export interface AppliedFilters {
  analysisType: AnalysisTypeFilter;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const ANALYSIS_TYPE_LABEL: Record<Exclude<AnalysisTypeFilter, 'all'>, string> = {
  risk: '리스크 진단',
  estimate: '가견적서 생성',
};

export const parseDateParam = (value: string | null): Date | undefined => {
  if (!value) {
    return undefined;
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return undefined;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }
  // 자동 보정(2025-02-31 → 2025-03-03) 거부
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return undefined;
  }
  return date;
};

export const formatDateParam = (date: Date | undefined): string | null => {
  if (!date) {
    return null;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const applyFilters = (rows: HistoryRow[], filters: AppliedFilters): HistoryRow[] =>
  rows.filter((row) => {
    if (filters.analysisType !== 'all' && row.analysisType !== ANALYSIS_TYPE_LABEL[filters.analysisType]) {
      return false;
    }

    const rowDate = new Date(row.date);

    if (filters.startDate) {
      const start = new Date(filters.startDate);
      start.setHours(0, 0, 0, 0);
      if (rowDate < start) {
        return false;
      }
    }

    if (filters.endDate) {
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);
      if (rowDate > end) {
        return false;
      }
    }

    return true;
  });
