import { z } from 'zod';
import { birthDateField, nameField, passwordField, phoneField } from './fields';

const optionalPasswordField = z.union([z.literal(''), passwordField]);

export const profileUpdateSchema = z
  .object({
    name: nameField,
    birth: birthDateField,
    phone: phoneField,
    password: optionalPasswordField,
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type ProfileUpdateFormValues = z.infer<typeof profileUpdateSchema>;
