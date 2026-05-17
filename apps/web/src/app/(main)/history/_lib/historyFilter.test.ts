import { describe, expect, it } from 'vitest';
import { applyFilters, formatDateParam, parseDateParam } from './historyFilter';
import { type HistoryRow } from '../_types/history.types';

const makeRow = (id: number, analysisType: HistoryRow['analysisType'], date: string): HistoryRow => ({
  id,
  date,
  analysisType,
  constructionType: '아파트',
  vendor: '문어건설',
  risk: { type: 'none' },
  status: '완료',
});

describe('parseDateParam', () => {
  it('null이면 undefined를 반환한다', () => {
    expect(parseDateParam(null)).toBeUndefined();
  });

  it('유효한 날짜 문자열을 Date로 파싱한다', () => {
    const result = parseDateParam('2025-01-15');
    expect(result).toBeInstanceOf(Date);
    expect(result?.getFullYear()).toBe(2025);
  });

  it('잘못된 날짜 문자열은 undefined를 반환한다', () => {
    expect(parseDateParam('invalid-date')).toBeUndefined();
  });
});

describe('formatDateParam', () => {
  it('undefined이면 null을 반환한다', () => {
    expect(formatDateParam(undefined)).toBeNull();
  });

  it('Date를 YYYY-MM-DD 포맷으로 변환한다', () => {
    expect(formatDateParam(new Date(2025, 0, 5))).toBe('2025-01-05');
  });

  it('두자리 월/일은 패딩한다', () => {
    expect(formatDateParam(new Date(2025, 11, 9))).toBe('2025-12-09');
  });
});

describe('applyFilters', () => {
  const rows: HistoryRow[] = [
    makeRow(1, '리스크 진단', '2025-01-10'),
    makeRow(2, '가견적서 생성', '2025-01-15'),
    makeRow(3, '리스크 진단', '2025-02-01'),
  ];

  it('analysisType이 all이면 모든 행을 반환한다', () => {
    const result = applyFilters(rows, { analysisType: 'all', startDate: undefined, endDate: undefined });
    expect(result).toHaveLength(3);
  });

  it('analysisType이 risk이면 리스크 진단 행만 반환한다', () => {
    const result = applyFilters(rows, { analysisType: 'risk', startDate: undefined, endDate: undefined });
    expect(result.map((r) => r.id)).toEqual([1, 3]);
  });

  it('startDate 이전 행은 제외한다', () => {
    const result = applyFilters(rows, {
      analysisType: 'all',
      startDate: new Date('2025-01-14'),
      endDate: undefined,
    });
    expect(result.map((r) => r.id)).toEqual([2, 3]);
  });

  it('endDate 이후 행은 제외한다', () => {
    const result = applyFilters(rows, {
      analysisType: 'all',
      startDate: undefined,
      endDate: new Date('2025-01-15'),
    });
    expect(result.map((r) => r.id)).toEqual([1, 2]);
  });

  it('startDate와 endDate를 동시에 적용한다', () => {
    const result = applyFilters(rows, {
      analysisType: 'all',
      startDate: new Date('2025-01-12'),
      endDate: new Date('2025-01-20'),
    });
    expect(result.map((r) => r.id)).toEqual([2]);
  });
});
