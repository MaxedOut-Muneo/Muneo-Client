export interface ApiEnvelope<T = unknown> {
  success: boolean;
  status: number;
  code: string;
  timestamp: string;
  message: string;
  result?: T;
  error?: Record<string, string>;
}

export interface PagedResult<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
