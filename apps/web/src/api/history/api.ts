import 'server-only';
import { cache } from 'react';
import { serverFetch } from '../server-client';
import { type EstimateItem, type RiskItem } from './types';

export const getServerEstimates = cache(
  async (userId: number): Promise<EstimateItem[]> =>
    serverFetch<EstimateItem[]>('api/v1/estimates', { headers: { 'x-user-id': String(userId) } })
);

export const getServerRiskDetections = cache(
  async (userId: number): Promise<RiskItem[]> =>
    serverFetch<RiskItem[]>('api/v1/risk-detector', { headers: { 'x-user-id': String(userId) } })
);
