import { z } from 'zod';
import { birthDateField, emailField, nameField, passwordField, phoneField } from './fields';

export const signupSchema = z
  .object({
    email: emailField,
    password: passwordField,
    passwordConfirm: z.string().min(1, '반드시 입력해야하는 필수 사항입니다.'),
    name: nameField,
    phone: phoneField,
    birthDate: birthDateField,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, '반드시 입력해야하는 필수 사항입니다.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const socialSignupSchema = z.object({
  name: nameField,
  phone: phoneField,
  birthDate: birthDateField,
});

export type SocialSignupFormValues = z.infer<typeof socialSignupSchema>;
