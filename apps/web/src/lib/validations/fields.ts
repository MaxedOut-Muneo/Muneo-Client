import { z } from 'zod';

export const emailField = z
  .string()
  .min(1, '반드시 입력해야하는 필수 사항입니다.')
  .pipe(z.email('올바른 이메일 형식이 아닙니다.'));

export const passwordField = z
  .string()
  .min(1, '반드시 입력해야하는 필수 사항입니다.')
  .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, '비밀번호는 최소 1개의 영문자, 숫자를 포함해야 합니다.');

export const nameField = z.string().trim().min(1, '반드시 입력해야하는 필수 사항입니다.');

export const phoneField = z
  .string()
  .min(1, '반드시 입력해야하는 필수 사항입니다.')
  .regex(/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/, '올바른 연락처 형식이 아닙니다. (예: 010-1234-5678)');

export const birthDateField = z
  .string()
  .min(1, '반드시 입력해야하는 필수 사항입니다.')
  .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식은 YYYY-MM-DD입니다.')
  .refine((val) => {
    const [year, month, day] = val.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }, '존재하지 않는 날짜입니다.')
  .refine((val) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(val) <= today;
  }, '미래 날짜는 입력할 수 없습니다.');
