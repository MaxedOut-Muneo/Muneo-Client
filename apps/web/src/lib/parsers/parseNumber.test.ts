import { describe, expect, it } from 'vitest';
import { parsePositiveNumber } from './parseNumber';

describe('parsePositiveNumber', () => {
  it('빈 문자열은 null을 반환한다', () => {
    expect(parsePositiveNumber('')).toBeNull();
  });

  it('양의 정수 문자열은 number로 파싱한다', () => {
    expect(parsePositiveNumber('25')).toBe(25);
  });

  it('양의 소수 문자열도 파싱한다', () => {
    expect(parsePositiveNumber('25.5')).toBe(25.5);
  });

  it('0은 null을 반환한다 (양수만 허용)', () => {
    expect(parsePositiveNumber('0')).toBeNull();
  });

  it('음수는 null을 반환한다', () => {
    expect(parsePositiveNumber('-5')).toBeNull();
  });

  it('숫자가 아닌 문자열은 null을 반환한다', () => {
    expect(parsePositiveNumber('abc')).toBeNull();
  });

  it('Infinity는 null을 반환한다', () => {
    expect(parsePositiveNumber('Infinity')).toBeNull();
  });

  it('공백만 있는 문자열은 0으로 파싱되어 null을 반환한다', () => {
    expect(parsePositiveNumber('   ')).toBeNull();
  });
});
