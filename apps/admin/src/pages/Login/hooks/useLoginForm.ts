import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ApiError, useLogin } from '@/api';
import { ROUTES } from '@/constants/routes';
import { loginSchema, zodIssuesToFieldErrors, type LoginInput } from '@/lib/userSchema';

type FieldErrors = Partial<Record<keyof LoginInput, string>>;
type LocationState = { from?: { pathname?: string } } | null;

export const useLoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from?.pathname ?? ROUTES.users;
  const login = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = () => {
    setSubmitError(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setFieldErrors(zodIssuesToFieldErrors<keyof LoginInput>(parsed.error.issues));
      return;
    }
    setFieldErrors({});

    login.mutate(parsed.data, {
      onSuccess: () => navigate(from, { replace: true }),
      onError: (error) => {
        if (error instanceof ApiError && error.fields) {
          setFieldErrors(error.fields as FieldErrors);
        } else if (error instanceof Error) {
          setSubmitError(error.message);
        }
      },
    });
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    fieldErrors,
    submitError,
    isPending: login.isPending,
    submit,
  };
};
