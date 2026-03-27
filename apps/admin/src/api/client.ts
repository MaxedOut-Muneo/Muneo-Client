import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    // NOTE: 공통 에러 처리 (401 리다이렉트 등)
    return Promise.reject(error);
  }
);
