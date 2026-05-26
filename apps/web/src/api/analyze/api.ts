import { client } from '../client';
import { type RiskDetectAnalyzeResponse, type RiskSaveBody } from './types';

const isDev = process.env.NODE_ENV === 'development';

export const analyzeRisk = async (formData: FormData, signal?: AbortSignal): Promise<RiskDetectAnalyzeResponse> => {
  if (isDev) {
    console.group('[진단] analyzeRisk — POST /api/v1/risk-detector/analyze');
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File { name: "${value.name}", type: "${value.type}", size: ${value.size} bytes }`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }
  }

  const res = await client
    .post('api/v1/risk-detector/analyze', {
      body: formData,
      headers: { 'content-type': undefined },
      timeout: 180000,
      signal,
    })
    .json<RiskDetectAnalyzeResponse>();

  if (isDev) {
    console.log('[응답]', res);
    console.groupEnd();
  }
  return res;
};

export const saveRisk = async (body: RiskSaveBody, userId: number): Promise<{ id: string }> => {
  if (isDev) {
    console.group('[진단] saveRisk — POST /api/v1/risk-detector/save');
    console.log('[요청]', { userId });
  }

  const res = await client
    .post('api/v1/risk-detector/save', { json: body, headers: { 'x-user-id': String(userId) } })
    .json<{ id: string }>();

  if (isDev) {
    console.log('[응답]', res);
    console.groupEnd();
  }
  return res;
};

export const deleteRisk = async (id: string, userId: number): Promise<void> => {
  if (isDev) {
    console.group(`[진단] deleteRisk — DELETE /api/v1/risk-detector/${id}`);
    console.log('[요청]', { id, userId });
  }

  await client.delete(`api/v1/risk-detector/${id}`, { headers: { 'x-user-id': String(userId) } });

  if (isDev) {
    console.log('[응답] 204 No Content');
    console.groupEnd();
  }
};
