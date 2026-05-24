import { type EstimateGenerateRequest, type EstimateGenerateResponse } from '@/app/(main)/estimate/_types/api';

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
  input: EstimateGenerateRequest;
  result: EstimateGenerateResponse;
}

export interface RiskItem {
  id: string;
  user_id: string;
  created_at: string;
  input: RiskInput;
  result: RiskResult;
}
