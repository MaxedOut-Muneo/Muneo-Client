import { z, type ZodIssue } from 'zod';

export const updateUserSchema = z.object({
  email: z.email('올바른 이메일 형식이어야 합니다.'),
  name: z.string().min(1, '이름은 필수입니다.'),
  phoneNumber: z.string().regex(/^010-\d{4}-\d{4}$/, 'ex) 010-0000-0000 형식입니다.'),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '생년월일은 YYYY-MM-DD 형식입니다.')
    .refine((value) => new Date(value).getTime() <= Date.now(), '미래 날짜는 작성할 수 없습니다.'),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const loginSchema = z.object({
  email: z.email('올바른 이메일 형식이어야 합니다.'),
  password: z.string().min(1, '비밀번호는 필수입니다.'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const zodIssuesToFieldErrors = <K extends string>(issues: ZodIssue[]): Partial<Record<K, string>> => {
  const errors: Partial<Record<K, string>> = {};
  issues.forEach((issue) => {
    const key = issue.path[0];
    if (typeof key === 'string' && !(key in errors)) {
      errors[key as K] = issue.message;
    }
  });
  return errors;
};
