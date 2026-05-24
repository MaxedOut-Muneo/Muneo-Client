import { describe, expect, it } from 'vitest';
import { loginSchema, updateUserSchema, zodIssuesToFieldErrors } from './userSchema';

describe('loginSchema', () => {
  it('valid email and password를 통과시킨다', () => {
    const result = loginSchema.safeParse({ email: 'admin@example.com', password: 'pw' });
    expect(result.success).toBe(true);
  });

  it('잘못된 이메일을 거부한다', () => {
    const result = loginSchema.safeParse({ email: 'invalid', password: 'pw' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'email')).toBe(true);
    }
  });

  it('빈 비밀번호를 거부한다', () => {
    const result = loginSchema.safeParse({ email: 'admin@example.com', password: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'password')).toBe(true);
    }
  });
});

describe('updateUserSchema', () => {
  const valid = {
    email: 'user@example.com',
    name: '홍길동',
    phoneNumber: '010-1234-5678',
    birthDate: '2000-01-01',
  };

  it('valid 입력을 통과시킨다', () => {
    expect(updateUserSchema.safeParse(valid).success).toBe(true);
  });

  it('빈 이름을 거부한다', () => {
    const result = updateUserSchema.safeParse({ ...valid, name: '' });
    expect(result.success).toBe(false);
  });

  it('잘못된 전화번호 형식을 거부한다', () => {
    const result = updateUserSchema.safeParse({ ...valid, phoneNumber: '01012345678' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain('010-0000-0000');
    }
  });

  it('미래 생년월일을 거부한다', () => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().slice(0, 10);
    const result = updateUserSchema.safeParse({ ...valid, birthDate: future });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain('미래');
    }
  });

  it('잘못된 생년월일 형식을 거부한다', () => {
    const result = updateUserSchema.safeParse({ ...valid, birthDate: '2000/01/01' });
    expect(result.success).toBe(false);
  });
});

describe('zodIssuesToFieldErrors', () => {
  it('각 필드의 첫 번째 메시지만 사용한다', () => {
    const result = loginSchema.safeParse({ email: 'invalid', password: '' });
    if (result.success) {
      throw new Error('expected failure');
    }
    const errors = zodIssuesToFieldErrors<'email' | 'password'>(result.error.issues);
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
  });

  it('빈 issues 배열은 빈 객체를 반환한다', () => {
    expect(zodIssuesToFieldErrors([])).toEqual({});
  });
});
