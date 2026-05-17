import { type HistoryRow } from '../_types/history.types';

export interface AppliedFilters {
  analysisType: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const ANALYSIS_TYPE_MAP: Record<string, string> = {
  risk: '리스크 진단',
  estimate: '가견적서 생성',
};

export const parseDateParam = (value: string | null): Date | undefined => {
  if (!value) {
    return undefined;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
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
    if (filters.analysisType !== 'all' && row.analysisType !== ANALYSIS_TYPE_MAP[filters.analysisType]) {
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
