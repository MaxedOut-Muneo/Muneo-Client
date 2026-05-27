import { describe, expect, it } from 'vitest';
import { formatBirthDate, formatPhoneNumber } from './inputFormat';

describe('formatPhoneNumber', () => {
  it('숫자만 입력하면 010-1234-5678 형식으로 변환한다', () => {
    expect(formatPhoneNumber('01012345678')).toBe('010-1234-5678');
  });

  it('이미 포맷된 값은 그대로 유지된다', () => {
    expect(formatPhoneNumber('010-1234-5678')).toBe('010-1234-5678');
  });

  it('11자리 초과 입력은 잘라낸다', () => {
    expect(formatPhoneNumber('0101234567890123')).toBe('010-1234-5678');
  });

  it('부분 입력도 단계적으로 포맷된다', () => {
    expect(formatPhoneNumber('010')).toBe('010');
    expect(formatPhoneNumber('0101')).toBe('010-1');
    expect(formatPhoneNumber('010123')).toBe('010-123');
    expect(formatPhoneNumber('0101234')).toBe('010-123-4');
  });

  it('10자리(예전 번호)도 010-123-4567로 처리한다', () => {
    expect(formatPhoneNumber('0101234567')).toBe('010-123-4567');
  });

  it('공백·하이픈·문자 섞여있어도 숫자만 추출한다', () => {
    expect(formatPhoneNumber('010 1234 5678')).toBe('010-1234-5678');
    expect(formatPhoneNumber('010-1234.5678')).toBe('010-1234-5678');
    expect(formatPhoneNumber('phone:01012345678')).toBe('010-1234-5678');
  });
});

describe('formatBirthDate', () => {
  it('8자리 숫자를 YYYY-MM-DD로 변환한다', () => {
    expect(formatBirthDate('19950515')).toBe('1995-05-15');
  });

  it('이미 포맷된 값은 그대로 유지된다', () => {
    expect(formatBirthDate('1995-05-15')).toBe('1995-05-15');
  });

  it('8자리 초과 입력은 잘라낸다', () => {
    expect(formatBirthDate('1995051599')).toBe('1995-05-15');
  });

  it('부분 입력도 단계적으로 포맷된다', () => {
    expect(formatBirthDate('1995')).toBe('1995');
    expect(formatBirthDate('19950')).toBe('1995-0');
    expect(formatBirthDate('199505')).toBe('1995-05');
    expect(formatBirthDate('1995051')).toBe('1995-05-1');
  });

  it('하이픈 등 비숫자는 무시한다', () => {
    expect(formatBirthDate('1995/05/15')).toBe('1995-05-15');
    expect(formatBirthDate('1995.05.15')).toBe('1995-05-15');
  });
});
