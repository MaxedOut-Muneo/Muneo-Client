import { type RiskDetectAnalyzeResponse, type RiskSaveBody } from '@/app/(main)/analysis/_types/analysis.types';
import { client } from './client';

// multipart/form-data: content-type 기본값 제거 → 브라우저가 boundary 포함 multipart 헤더 자동 설정
export const analyzeRisk = async (formData: FormData, signal?: AbortSignal): Promise<RiskDetectAnalyzeResponse> => {
  console.group('[진단] analyzeRisk — POST /api/v1/risk-detector/analyze');
  console.log('[요청 FormData 항목]');
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: File { name: "${value.name}", type: "${value.type}", size: ${value.size} bytes }`);
    } else {
      console.log(`  ${key}: ${value}`);
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

  console.log('[응답]', res);
  console.groupEnd();
  return res;
};

export const saveRisk = async (body: RiskSaveBody, userId: number): Promise<{ id: string }> => {
  console.group('[진단] saveRisk — POST /api/v1/risk-detector/save');
  console.log('[요청]', { userId, body });

  const res = await client
    .post('api/v1/risk-detector/save', { json: body, headers: { 'x-user-id': String(userId) } })
    .json<{ id: string }>();

  console.log('[응답]', res);
  console.groupEnd();
  return res;
};

export const deleteRisk = async (id: string, userId: number): Promise<void> => {
  console.group(`[진단] deleteRisk — DELETE /api/v1/risk-detector/${id}`);
  console.log('[요청]', { id, userId });

  await client.delete(`api/v1/risk-detector/${id}`, { headers: { 'x-user-id': String(userId) } });

  console.log('[응답] 204 No Content');
  console.groupEnd();
};
