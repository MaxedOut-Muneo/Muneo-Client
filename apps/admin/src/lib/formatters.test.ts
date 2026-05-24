import { describe, expect, it } from 'vitest';
import { formatPhone } from './formatters';

describe('formatPhone', () => {
  it('빈 문자열은 - 로 표시한다', () => {
    expect(formatPhone('')).toBe('-');
  });

  it('이미 - 가 포함된 값은 그대로 반환한다', () => {
    expect(formatPhone('010-1234-5678')).toBe('010-1234-5678');
  });

  it('11자리 숫자를 010-0000-0000 형태로 변환한다', () => {
    expect(formatPhone('01012345678')).toBe('010-1234-5678');
  });

  it('규격에 안 맞는 값은 원본 그대로 반환한다', () => {
    expect(formatPhone('123')).toBe('123');
    expect(formatPhone('010123456789')).toBe('010123456789');
  });
});
