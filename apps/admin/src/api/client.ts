import axios, { type AxiosError } from 'axios';
import { useAuthStore } from '@/store/authStore';

const baseURL = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL;

export const client = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const url = error.config?.url ?? '';
      const isLoginRequest = url.includes('/admin/auth/login') || url.includes('/admin/login');
      if (!isLoginRequest) {
        useAuthStore.getState().clear();
      }
    }
    return Promise.reject(error);
  }
);
