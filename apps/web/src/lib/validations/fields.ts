import { z } from 'zod';

export const emailField = z
  .string()
  .min(1, '반드시 입력해야하는 필수 사항입니다.')
  .email('올바른 이메일 형식이 아닙니다.');

export const passwordField = z
  .string()
  .min(1, '반드시 입력해야하는 필수 사항입니다.')
  .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, '비밀번호는 최소 1개의 영문자, 숫자를 포함해야 합니다.');

export const nameField = z.string().min(1, '반드시 입력해야하는 필수 사항입니다.');

export const phoneField = z
  .string()
  .min(1, '반드시 입력해야하는 필수 사항입니다.')
  .regex(/^[0-9-]+$/, '올바른 연락처 형식이 아닙니다.');

export const birthDateField = z
  .string()
  .min(1, '반드시 입력해야하는 필수 사항입니다.')
  .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식은 YYYY-MM-DD입니다.');
