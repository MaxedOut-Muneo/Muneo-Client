'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
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

function applyFilters(rows: HistoryRow[], filters: AppliedFilters): HistoryRow[] {
  return rows.filter((row) => {
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
}

export function HistoryContent() {
  const router = useRouter();
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    analysisType: 'all',
    startDate: undefined,
    endDate: undefined,
  });

  const filteredRows = useMemo(() => applyFilters(MOCK_HISTORY_ROWS, appliedFilters), [appliedFilters]);

  return (
    <>
      <HistoryFilterBar
        onSearch={(analysisType, startDate, endDate) => {
          setAppliedFilters({ analysisType, startDate, endDate });
        }}
      />
      <HistoryTable rows={filteredRows} onRowClick={(id) => router.push(`/history/${id}`)} />
    </>
  );
}
