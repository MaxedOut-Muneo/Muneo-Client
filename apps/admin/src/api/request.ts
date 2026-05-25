import { AxiosError, type AxiosResponse } from 'axios';
import { type ApiEnvelope } from './types';

export class ApiError extends Error {
  status: number;
  code: string;
  fields?: Record<string, string>;

  constructor(message: string, status: number, code: string, fields?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiEnvelope | undefined;
    if (data?.message) {
      return new ApiError(
        data.message,
        data.status ?? error.response?.status ?? 500,
        data.code ?? 'UNKNOWN',
        data.error
      );
    }
    return new ApiError(error.message, error.response?.status ?? 500, 'NETWORK_ERROR');
  }
  if (error instanceof Error) {
    return new ApiError(error.message, 500, 'UNKNOWN');
  }
  return new ApiError('알 수 없는 오류가 발생했습니다.', 500, 'UNKNOWN');
};

export const requestResult = async <T>(promise: Promise<AxiosResponse<ApiEnvelope<T>>>): Promise<T> => {
  try {
    const response = await promise;
    if (!response.data.success || response.data.result === undefined) {
      throw new ApiError(response.data.message, response.data.status, response.data.code, response.data.error);
    }
    return response.data.result;
  } catch (error) {
    throw toApiError(error);
  }
};

export const requestVoid = async (promise: Promise<AxiosResponse<ApiEnvelope>>): Promise<void> => {
  try {
    const response = await promise;
    if (!response.data.success) {
      throw new ApiError(response.data.message, response.data.status, response.data.code, response.data.error);
    }
  } catch (error) {
    throw toApiError(error);
  }
};
