import {
  type EstimateGenerateRequest,
  type EstimateGenerateResponse,
  type EstimateSaveRequest,
  type EstimateSaveResponse,
} from '@/app/(main)/estimate/_types/api';
import { client } from './client';

export const generateEstimate = async (payload: EstimateGenerateRequest): Promise<EstimateGenerateResponse> => {
  console.log('[generateEstimate] 요청 payload:', payload);
  const response = await client.post('api/v1/estimates/generate', { json: payload }).json<EstimateGenerateResponse>();
  console.log('[generateEstimate] 응답 data:', response);
  return response;
};

export const saveEstimate = (payload: EstimateSaveRequest, userId: number): Promise<EstimateSaveResponse> =>
  client
    .post('api/v1/estimates/save', { json: payload, headers: { 'x-user-id': String(userId) } })
    .json<EstimateSaveResponse>();

export const deleteEstimate = (id: string, userId: number): Promise<void> =>
  client.delete(`api/v1/estimates/${id}`, { headers: { 'x-user-id': String(userId) } }).then(() => undefined);
