import { describe, expect, it } from 'vitest';
import { birthDateField, emailField, nameField, passwordField, phoneField } from './fields';

describe('emailField', () => {
  it('빈 문자열은 거부한다', () => {
    expect(emailField.safeParse('').success).toBe(false);
  });

  it('이메일 형식이 아니면 거부한다', () => {
    expect(emailField.safeParse('not-an-email').success).toBe(false);
    expect(emailField.safeParse('name@').success).toBe(false);
    expect(emailField.safeParse('@example.com').success).toBe(false);
  });

  it('올바른 이메일은 허용한다', () => {
    expect(emailField.safeParse('user@example.com').success).toBe(true);
    expect(emailField.safeParse('first.last@sub.example.co.kr').success).toBe(true);
  });
});

describe('passwordField', () => {
  it('빈 문자열은 거부한다', () => {
    expect(passwordField.safeParse('').success).toBe(false);
  });

  it('영문만 있으면 거부한다', () => {
    expect(passwordField.safeParse('abcdef').success).toBe(false);
  });

  it('숫자만 있으면 거부한다', () => {
    expect(passwordField.safeParse('123456').success).toBe(false);
  });

  it('영문+숫자 조합은 허용한다', () => {
    expect(passwordField.safeParse('abc123').success).toBe(true);
    expect(passwordField.safeParse('1a').success).toBe(true);
  });
});

describe('nameField', () => {
  it('공백 문자열은 거부한다 (trim 후 빈 문자열)', () => {
    expect(nameField.safeParse('   ').success).toBe(false);
    expect(nameField.safeParse('\t\n  ').success).toBe(false);
  });

  it('빈 문자열은 거부한다', () => {
    expect(nameField.safeParse('').success).toBe(false);
  });

  it('양 끝 공백을 trim한 뒤 값을 노출한다', () => {
    const result = nameField.safeParse('  홍길동  ');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe('홍길동');
    }
  });

  it('정상 이름을 허용한다', () => {
    expect(nameField.safeParse('홍길동').success).toBe(true);
    expect(nameField.safeParse('John Doe').success).toBe(true);
  });
});

describe('phoneField', () => {
  it('빈 문자열은 거부한다', () => {
    expect(phoneField.safeParse('').success).toBe(false);
  });

  it('하이픈 없는 형식은 거부한다', () => {
    expect(phoneField.safeParse('01012345678').success).toBe(false);
  });

  it('잘못된 형식은 거부한다', () => {
    expect(phoneField.safeParse('010-12-3456').success).toBe(false);
    expect(phoneField.safeParse('010-12345-6789').success).toBe(false);
    expect(phoneField.safeParse('010-1234-567').success).toBe(false);
    expect(phoneField.safeParse('abc-1234-5678').success).toBe(false);
  });

  it('올바른 010 형식을 허용한다', () => {
    expect(phoneField.safeParse('010-1234-5678').success).toBe(true);
  });

  it('지역번호 02 (2자리)도 허용한다', () => {
    expect(phoneField.safeParse('02-123-4567').success).toBe(true);
    expect(phoneField.safeParse('02-1234-5678').success).toBe(true);
  });
});

describe('birthDateField', () => {
  it('빈 문자열은 거부한다', () => {
    expect(birthDateField.safeParse('').success).toBe(false);
  });

  it('YYYY-MM-DD 형식이 아니면 거부한다', () => {
    expect(birthDateField.safeParse('2025/01/01').success).toBe(false);
    expect(birthDateField.safeParse('2025-1-1').success).toBe(false);
    expect(birthDateField.safeParse('25-01-01').success).toBe(false);
    expect(birthDateField.safeParse('2025-01').success).toBe(false);
  });

  it('존재하지 않는 날짜는 거부한다', () => {
    expect(birthDateField.safeParse('2025-02-30').success).toBe(false);
    expect(birthDateField.safeParse('2025-13-01').success).toBe(false);
    expect(birthDateField.safeParse('2025-04-31').success).toBe(false);
    expect(birthDateField.safeParse('2023-02-29').success).toBe(false);
  });

  it('실존하는 날짜를 허용한다', () => {
    expect(birthDateField.safeParse('2000-01-01').success).toBe(true);
    expect(birthDateField.safeParse('1990-12-31').success).toBe(true);
    expect(birthDateField.safeParse('2024-02-29').success).toBe(true);
  });
});
