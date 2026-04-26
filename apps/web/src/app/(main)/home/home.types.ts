export type RiskStatus = { type: 'danger'; label: string } | { type: 'safe'; label: string } | { type: 'none' };

export interface HistoryRow {
  id: number;
  date: string;
  analysisType: string;
  constructionType: string;
  risk: RiskStatus;
}

export interface SummaryStats {
  estimateCount: number;
  diagnosedCount: number;
  riskCount: number;
}
