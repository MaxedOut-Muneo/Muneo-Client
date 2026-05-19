export interface ApiSuccessResponse<T> {
  success: true;
  status: number;
  code: string;
  timestamp: string;
  message: string;
  result: T;
}

export interface ApiErrorResponse {
  success: false;
  status: number;
  code: string;
  timestamp: string;
  message: string;
  error?: Record<string, string> | string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
