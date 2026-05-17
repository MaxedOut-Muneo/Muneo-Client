'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { applyFilters, formatDateParam, parseDateParam, type AppliedFilters } from '../../_lib/historyFilter';
import { MOCK_HISTORY_ROWS } from '../../_mocks/history.mock';
import { HistoryFilterBar } from '../HistoryFilterBar/HistoryFilterBar';
import { HistoryTable } from '../HistoryTable/HistoryTable';

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
