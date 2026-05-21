import { type EstimateGenerateResponse } from '@/app/(main)/estimate/_types/api';
import { client } from './client';

interface EstimateInput {
  공종: string[];
  공간유형: string;
  평수: number;
  지역?: string;
  [key: string]: unknown;
}

interface RiskSummary {
  total_risk_items: number;
  chips: { 누락: number; 중복: number; 불분명: number };
}

interface RiskResult {
  report: {
    summary: RiskSummary;
  };
}

interface RiskInput {
  spaceType: string;
  pyeong: number;
  companyName: string;
  [key: string]: unknown;
}

export interface EstimateItem {
  id: string;
  user_id: string;
  created_at: string;
  input: EstimateInput;
  result: EstimateGenerateResponse;
}

export interface RiskItem {
  id: string;
  user_id: string;
  created_at: string;
  input: RiskInput;
  result: RiskResult;
}

export const getEstimates = (userId: number): Promise<EstimateItem[]> =>
  client.get('api/v1/estimates', { headers: { 'x-user-id': String(userId) } }).json<EstimateItem[]>();

export const getRiskDetections = (userId: number): Promise<RiskItem[]> =>
  client.get('api/v1/risk-detector', { headers: { 'x-user-id': String(userId) } }).json<RiskItem[]>();
