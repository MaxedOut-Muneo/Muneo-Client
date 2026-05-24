import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { login } from './api';
import { type LoginRequest } from './types';

export const useLogin = () => {
  const setAdmin = useAuthStore((state) => state.setAdmin);

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (admin) => {
      setAdmin(admin);
    },
  });
};
