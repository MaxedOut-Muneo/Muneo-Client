import { describe, expect, it } from 'vitest';
import { applyFilters, formatDateParam, parseDateParam } from './historyFilter';
import { type HistoryRow } from '../_types/history.types';

const makeRow = (id: string, analysisType: HistoryRow['analysisType'], date: string): HistoryRow => ({
  id,
  date,
  analysisType,
  constructionType: '아파트',
  risk: { missing: 0, unclear: 0 },
  status: '완료',
});

describe('parseDateParam', () => {
  it('null이면 undefined를 반환한다', () => {
    expect(parseDateParam(null)).toBeUndefined();
  });

  it('YYYY-MM-DD 문자열을 로컬 타임존 Date로 파싱한다', () => {
    const result = parseDateParam('2025-01-15');
    expect(result).toBeInstanceOf(Date);
    expect(result?.getFullYear()).toBe(2025);
    expect(result?.getMonth()).toBe(0);
    expect(result?.getDate()).toBe(15);
  });

  it('잘못된 날짜 문자열은 undefined를 반환한다', () => {
    expect(parseDateParam('invalid-date')).toBeUndefined();
  });

  it('YYYY-MM-DD 외 포맷은 undefined를 반환한다', () => {
    expect(parseDateParam('2025/01/15')).toBeUndefined();
    expect(parseDateParam('2025-1-1')).toBeUndefined();
  });

  it('존재하지 않는 날짜는 undefined를 반환한다 (자동 보정 거부)', () => {
    expect(parseDateParam('2025-02-31')).toBeUndefined();
    expect(parseDateParam('2025-13-01')).toBeUndefined();
    expect(parseDateParam('2025-04-31')).toBeUndefined();
    expect(parseDateParam('2025-00-15')).toBeUndefined();
    expect(parseDateParam('2025-01-00')).toBeUndefined();
  });

  it('parse → format 라운드트립이 원본 문자열을 유지한다 (타임존 무관)', () => {
    const cases = ['2025-01-15', '2025-12-31', '2024-02-29'];
    for (const value of cases) {
      expect(formatDateParam(parseDateParam(value))).toBe(value);
    }
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
    makeRow('1', '리스크 진단', '2025-01-10'),
    makeRow('2', '가견적서 생성', '2025-01-15'),
    makeRow('3', '리스크 진단', '2025-02-01'),
  ];

  it('analysisType이 all이면 모든 행을 반환한다', () => {
    const result = applyFilters(rows, { analysisType: 'all', startDate: undefined, endDate: undefined });
    expect(result).toHaveLength(3);
  });

  it('analysisType이 risk이면 리스크 진단 행만 반환한다', () => {
    const result = applyFilters(rows, { analysisType: 'risk', startDate: undefined, endDate: undefined });
    expect(result.map((r) => r.id)).toEqual(['1', '3']);
  });

  it('startDate 이전 행은 제외한다', () => {
    const result = applyFilters(rows, {
      analysisType: 'all',
      startDate: new Date('2025-01-14'),
      endDate: undefined,
    });
    expect(result.map((r) => r.id)).toEqual(['2', '3']);
  });

  it('endDate 이후 행은 제외한다', () => {
    const result = applyFilters(rows, {
      analysisType: 'all',
      startDate: undefined,
      endDate: new Date('2025-01-15'),
    });
    expect(result.map((r) => r.id)).toEqual(['1', '2']);
  });

  it('startDate와 endDate를 동시에 적용한다', () => {
    const result = applyFilters(rows, {
      analysisType: 'all',
      startDate: new Date('2025-01-12'),
      endDate: new Date('2025-01-20'),
    });
    expect(result.map((r) => r.id)).toEqual(['2']);
  });
});
