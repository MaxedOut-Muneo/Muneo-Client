export interface ChatSource {
  title?: string;
  url?: string;
  snippet?: string;
}

export interface ChatUsed {
  is_interior: boolean;
  use_estimate_cases: boolean;
  use_legal_docs: boolean;
  use_defect_docs: boolean;
}

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
  used: ChatUsed;
  sources: ChatSource[];
}
