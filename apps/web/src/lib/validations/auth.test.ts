import { describe, expect, it } from 'vitest';
import { loginSchema, signupSchema } from './auth';

const VALID_SIGNUP = {
  email: 'user@example.com',
  password: 'abc123',
  passwordConfirm: 'abc123',
  name: '홍길동',
  phone: '010-1234-5678',
  birthDate: '2000-01-01',
};

describe('signupSchema', () => {
  it('모든 필드가 유효하면 성공한다', () => {
    expect(signupSchema.safeParse(VALID_SIGNUP).success).toBe(true);
  });

  it('비밀번호와 비밀번호 확인이 다르면 실패한다', () => {
    const result = signupSchema.safeParse({ ...VALID_SIGNUP, passwordConfirm: 'different1' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === 'passwordConfirm');
      expect(issue?.message).toBe('비밀번호가 일치하지 않습니다.');
    }
  });

  it('이메일이 잘못되면 email 필드에 에러를 보고한다', () => {
    const result = signupSchema.safeParse({ ...VALID_SIGNUP, email: 'invalid' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'email')).toBe(true);
    }
  });

  it('이름이 공백만 있으면 실패한다', () => {
    const result = signupSchema.safeParse({ ...VALID_SIGNUP, name: '   ' });
    expect(result.success).toBe(false);
  });

  it('연락처가 잘못된 형식이면 실패한다', () => {
    const result = signupSchema.safeParse({ ...VALID_SIGNUP, phone: '01012345678' });
    expect(result.success).toBe(false);
  });

  it('생년월일이 존재하지 않는 날짜면 실패한다', () => {
    const result = signupSchema.safeParse({ ...VALID_SIGNUP, birthDate: '2025-02-30' });
    expect(result.success).toBe(false);
  });
});

describe('loginSchema', () => {
  it('이메일+비밀번호가 있으면 성공한다', () => {
    expect(loginSchema.safeParse({ email: 'user@example.com', password: 'anything' }).success).toBe(true);
  });

  it('이메일이 잘못되면 실패한다', () => {
    expect(loginSchema.safeParse({ email: 'bad', password: 'pw' }).success).toBe(false);
  });

  it('비밀번호가 빈 문자열이면 실패한다', () => {
    expect(loginSchema.safeParse({ email: 'user@example.com', password: '' }).success).toBe(false);
  });

  it('signupSchema의 비밀번호 정책(영문+숫자)은 적용되지 않는다', () => {
    expect(loginSchema.safeParse({ email: 'user@example.com', password: 'abc' }).success).toBe(true);
    expect(loginSchema.safeParse({ email: 'user@example.com', password: '123' }).success).toBe(true);
  });
});
