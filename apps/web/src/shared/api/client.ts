import ky from 'ky';

export const client = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        // NOTE: 공통 에러 처리 (401 리다이렉트 등)
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
      },
    ],
  },
});
