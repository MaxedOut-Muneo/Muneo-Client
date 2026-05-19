interface EstimateInput {
  공종: string[];
  공간유형: string;
  평수: number;
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
  result: unknown;
}

export interface RiskItem {
  id: string;
  user_id: string;
  created_at: string;
  input: RiskInput;
  result: RiskResult;
}
