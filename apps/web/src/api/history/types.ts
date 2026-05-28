import { type RiskAnalyzeRequestBody, type RiskReport } from '@/api/analyze';
import { type EstimateGenerateRequest, type EstimateGenerateResponse } from '@/api/estimate';

export interface EstimateItem {
  id: string;
  user_id: string;
  created_at: string;
  input: EstimateGenerateRequest;
  result: EstimateGenerateResponse;
}

interface RiskResult {
  report: RiskReport;
}

export interface RiskItem {
  id: string;
  user_id: string;
  created_at: string;
  input: RiskAnalyzeRequestBody;
  result: RiskResult;
}
