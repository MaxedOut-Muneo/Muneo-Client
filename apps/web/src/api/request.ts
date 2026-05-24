import { toApiError } from './errors';
import { type ApiSuccessResponse } from './types';

export const requestResult = async <T>(fn: () => Promise<unknown>): Promise<T> => {
  try {
    const res = (await fn()) as ApiSuccessResponse<T>;
    return res.result;
  } catch (e) {
    throw toApiError(e);
  }
};

export const requestVoid = async (fn: () => Promise<unknown>): Promise<void> => {
  try {
    await fn();
  } catch (e) {
    throw toApiError(e);
  }
};
