'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { MOCK_HISTORY_ROWS } from '../../_mocks/history.mock';
import { type HistoryRow } from '../../_types/history.types';
import { HistoryFilterBar } from '../HistoryFilterBar/HistoryFilterBar';
import { HistoryTable } from '../HistoryTable/HistoryTable';

interface AppliedFilters {
  analysisType: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const ANALYSIS_TYPE_MAP: Record<string, string> = {
  risk: '리스크 진단',
  estimate: '가견적서 생성',
};

const parseDateParam = (value: string | null): Date | undefined => {
  if (!value) {
    return undefined;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

const formatDateParam = (date: Date | undefined): string | null => {
  if (!date) {
    return null;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const applyFilters = (rows: HistoryRow[], filters: AppliedFilters): HistoryRow[] =>
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

export const HistoryContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const appliedFilters: AppliedFilters = {
    analysisType: searchParams.get('type') ?? 'all',
    startDate: parseDateParam(searchParams.get('from')),
    endDate: parseDateParam(searchParams.get('to')),
  };

  const filteredRows = applyFilters(MOCK_HISTORY_ROWS, appliedFilters);

  return (
    <>
      <HistoryFilterBar
        initialAnalysisType={appliedFilters.analysisType}
        initialStartDate={appliedFilters.startDate}
        initialEndDate={appliedFilters.endDate}
        onSearch={(analysisType, startDate, endDate) => {
          const params = new URLSearchParams();
          if (analysisType !== 'all') {
            params.set('type', analysisType);
          }
          const from = formatDateParam(startDate);
          const to = formatDateParam(endDate);
          if (from) {
            params.set('from', from);
          }
          if (to) {
            params.set('to', to);
          }
          const query = params.toString();
          router.push(query ? `/history?${query}` : '/history');
        }}
      />
      <HistoryTable rows={filteredRows} onRowClick={(id) => router.push(`/history/${id}`)} />
    </>
  );
};
