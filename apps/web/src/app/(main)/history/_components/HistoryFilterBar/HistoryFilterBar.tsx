'use client';

import { Button, DatePicker, Dropdown } from '@muneo/design-system';
import { useState } from 'react';
import * as styles from './HistoryFilterBar.css';

const ANALYSIS_TYPE_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'risk', label: '리스크 진단' },
  { value: 'estimate', label: '가견적서 생성' },
];

interface HistoryFilterBarProps {
  initialAnalysisType?: string;
  initialStartDate?: Date;
  initialEndDate?: Date;
  onSearch: (analysisType: string, startDate: Date | undefined, endDate: Date | undefined) => void;
}

export const HistoryFilterBar = ({
  initialAnalysisType = 'all',
  initialStartDate,
  initialEndDate,
  onSearch,
}: HistoryFilterBarProps) => {
  const [analysisType, setAnalysisType] = useState<string>(initialAnalysisType);
  const [startDate, setStartDate] = useState<Date | undefined>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterLeft}>
        <Dropdown
          options={ANALYSIS_TYPE_OPTIONS}
          value={analysisType}
          onChange={setAnalysisType}
          className={styles.dropdown}
        />
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          onChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
          placeholder="날짜를 선택하세요"
        />
      </div>
      <Button
        variant="outline"
        size="sm"
        className={styles.searchButton}
        onClick={() => onSearch(analysisType, startDate, endDate)}
      >
        검색
      </Button>
    </div>
  );
};
