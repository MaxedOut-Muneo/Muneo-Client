import {
  type EstimateGenerateRequest,
  type EstimateGenerateResponse,
  type EstimateSaveRequest,
  type EstimateSaveResponse,
} from '@/app/(main)/estimate/_types/api';
import { client } from './client';

export const generateEstimate = (payload: EstimateGenerateRequest): Promise<EstimateGenerateResponse> =>
  client.post('api/v1/estimates/generate', { json: payload }).json<EstimateGenerateResponse>();

export const saveEstimate = (payload: EstimateSaveRequest, userId: number): Promise<EstimateSaveResponse> =>
  client
    .post('api/v1/estimates/save', { json: payload, headers: { 'x-user-id': String(userId) } })
    .json<EstimateSaveResponse>();

export const deleteEstimate = (id: string, userId: number): Promise<void> =>
  client.delete(`api/v1/estimates/${id}`, { headers: { 'x-user-id': String(userId) } }).then(() => undefined);
