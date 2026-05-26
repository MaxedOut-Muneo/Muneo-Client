export type RiskStatus = { type: 'danger'; label: string } | { type: 'safe'; label: string } | { type: 'none' };
export type AnalysisStatus = '완료' | '진행중' | '대기';

export interface HistoryRow {
  id: string;
  date: string;
  analysisType: string;
  constructionType: string;
  vendor: string;
  risk: RiskStatus;
  status: AnalysisStatus;
}

export interface EstimateSummary {
  constructionType: string;
  selectedProcesses: string[];
  totalEstimate: string;
  analyzedAt: string;
}
