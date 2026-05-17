import ky from 'ky';

const apiBaseUrl = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_BASE_URL : window.location.origin;

export const client = ky.create({
  prefixUrl: apiBaseUrl,
  timeout: 10000,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        // 공통 에러 처리 (401 리다이렉트 등) — 응답 body를 에러에 첨부해 호출자가 에러 코드 파싱 가능
        if (!response.ok) {
          const body = await response
            .clone()
            .json()
            .catch(() => null);
          const error = new Error(`API Error: ${response.status}`);
          Object.assign(error, { status: response.status, body });
          throw error;
        }
      },
    ],
  },
});
