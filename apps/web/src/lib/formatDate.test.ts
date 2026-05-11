import { describe, expect, it } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  const date = new Date(2026, 3, 30, 15, 5);

  it('기본 포맷은 dot (YYYY.MM.DD)', () => {
    expect(formatDate(date)).toBe('2026.04.30');
  });

  it('dash 포맷', () => {
    expect(formatDate(date, 'dash')).toBe('2026-04-30');
  });

  it('dotTime 포맷', () => {
    expect(formatDate(date, 'dotTime')).toBe('2026.04.30 15:05');
  });

  it('korean 포맷', () => {
    expect(formatDate(date, 'korean')).toBe('2026년 04월 30일');
  });

  it('문자열 입력도 처리한다', () => {
    expect(formatDate('2026-04-30')).toBe('2026.04.30');
  });

  it('timestamp 입력도 처리한다', () => {
    expect(formatDate(date.getTime())).toBe('2026.04.30');
  });
});
