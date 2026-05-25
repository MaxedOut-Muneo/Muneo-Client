import { AxiosError, type AxiosResponse } from 'axios';
import { describe, expect, it } from 'vitest';
import { ApiError, requestResult, requestVoid } from './request';
import { type ApiEnvelope } from './types';

const okEnvelope = <T>(result: T): AxiosResponse<ApiEnvelope<T>> =>
  ({
    data: {
      success: true,
      status: 200,
      code: 'SUCCESS',
      timestamp: '2026-05-17T08:00:00Z',
      message: 'ok',
      result,
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as never,
  }) as AxiosResponse<ApiEnvelope<T>>;

const errEnvelope = (envelope: Partial<ApiEnvelope>): AxiosResponse<ApiEnvelope> =>
  ({
    data: {
      success: false,
      status: envelope.status ?? 400,
      code: envelope.code ?? 'BAD_REQUEST',
      timestamp: '2026-05-17T08:00:00Z',
      message: envelope.message ?? 'error',
      error: envelope.error,
    },
    status: envelope.status ?? 400,
    statusText: 'Error',
    headers: {},
    config: {} as never,
  }) as AxiosResponse<ApiEnvelope>;

describe('requestResult', () => {
  it('성공 envelope의 result만 반환한다', async () => {
    const value = await requestResult(Promise.resolve(okEnvelope({ id: 1 })));
    expect(value).toEqual({ id: 1 });
  });

  it('success=false envelope는 ApiError로 던진다', async () => {
    await expect(
      requestResult(
        Promise.resolve(
          errEnvelope({ status: 409, code: 'USER_ALREADY_DELETED', message: '이미 탈퇴 처리된 사용자입니다.' })
        )
      )
    ).rejects.toMatchObject({
      name: 'ApiError',
      status: 409,
      code: 'USER_ALREADY_DELETED',
    });
  });

  it('AxiosError를 ApiError로 변환한다', async () => {
    const axiosError = new AxiosError('Request failed');
    axiosError.response = errEnvelope({
      status: 400,
      code: 'VALIDATION_FAILED',
      message: '요청 값이 올바르지 않습니다.',
      error: { email: '필수입니다.' },
    });

    await expect(requestResult(Promise.reject(axiosError))).rejects.toMatchObject({
      name: 'ApiError',
      status: 400,
      code: 'VALIDATION_FAILED',
      fields: { email: '필수입니다.' },
    });
  });

  it('응답 데이터가 없으면 NETWORK_ERROR 코드를 사용한다', async () => {
    const axiosError = new AxiosError('Network Error');
    await expect(requestResult(Promise.reject(axiosError))).rejects.toMatchObject({
      name: 'ApiError',
      code: 'NETWORK_ERROR',
    });
  });
});

describe('requestVoid', () => {
  it('success=true envelope는 정상 종료한다', async () => {
    await expect(requestVoid(Promise.resolve(okEnvelope(undefined)))).resolves.toBeUndefined();
  });

  it('success=false envelope는 ApiError로 던진다', async () => {
    await expect(requestVoid(Promise.resolve(errEnvelope({ code: 'FORBIDDEN', status: 403 })))).rejects.toBeInstanceOf(
      ApiError
    );
  });
});
