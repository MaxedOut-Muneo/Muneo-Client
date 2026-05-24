export interface HistoryRow {
  id: string;
  date: string;
  analysisType: string;
  constructionType: string;
  vendor?: string | null;
}

export interface SummaryStats {
  estimateCount: number;
  diagnosedCount: number;
  riskCount: number;
}
