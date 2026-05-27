import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '@/api/errors';

const mutateMock = vi.fn();

vi.mock('@/api/chatbot', () => ({
  useAskChatbot: () => ({ mutate: mutateMock, isPending: false }),
}));

const { useChatMessages } = await import('./useChatMessages');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useChatMessages', () => {
  beforeEach(() => {
    mutateMock.mockReset();
  });

  it('초기 메시지에 환영 메시지가 포함된다', () => {
    const { result } = renderHook(() => useChatMessages(), { wrapper: createWrapper() });
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].role).toBe('ai');
    expect(result.current.messages[0].content).toMatch(/안녕하세요/);
  });

  it('send 호출 시 user 메시지와 loading ai 메시지가 추가된다', () => {
    const { result } = renderHook(() => useChatMessages(), { wrapper: createWrapper() });
    act(() => {
      result.current.send('도배 가격');
    });
    const last = result.current.messages.slice(-2);
    expect(last[0]).toMatchObject({ role: 'user', content: '도배 가격', status: 'done' });
    expect(last[1]).toMatchObject({ role: 'ai', status: 'loading' });
    expect(mutateMock).toHaveBeenCalledWith({ question: '도배 가격' }, expect.any(Object));
  });

  it('빈 문자열은 무시되어 메시지가 추가되지 않는다', () => {
    const { result } = renderHook(() => useChatMessages(), { wrapper: createWrapper() });
    const initialLength = result.current.messages.length;
    act(() => {
      result.current.send('   ');
    });
    expect(result.current.messages).toHaveLength(initialLength);
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it('mutation 성공 시 loading 메시지가 typing 상태로 교체된다', async () => {
    const { result } = renderHook(() => useChatMessages(), { wrapper: createWrapper() });
    act(() => {
      result.current.send('질문');
    });
    const [, callbacks] = mutateMock.mock.calls[0];
    act(() => {
      callbacks.onSuccess({ answer: 'AI 답변입니다', used: {}, sources: [] });
    });
    await waitFor(() => {
      const aiMessage = result.current.messages.find((m) => m.role === 'ai' && m.status === 'typing');
      expect(aiMessage?.content).toBe('AI 답변입니다');
    });
  });

  it('401 에러 시 login-required 메시지로 교체된다', async () => {
    const { result } = renderHook(() => useChatMessages(), { wrapper: createWrapper() });
    act(() => {
      result.current.send('질문');
    });
    const [, callbacks] = mutateMock.mock.calls[0];
    const apiError = new ApiError('UNAUTHORIZED', '로그인이 필요합니다.', 401);
    act(() => {
      callbacks.onError(apiError);
    });
    await waitFor(() => {
      const aiMessage = result.current.messages.find((m) => m.kind === 'login-required');
      expect(aiMessage?.content).toBe('로그인이 필요해요!');
    });
  });

  it('일반 에러 시 fallback 메시지로 교체된다', async () => {
    const { result } = renderHook(() => useChatMessages(), { wrapper: createWrapper() });
    act(() => {
      result.current.send('질문');
    });
    const [, callbacks] = mutateMock.mock.calls[0];
    const apiError = new ApiError('INTERNAL_SERVER_ERROR', '서버 에러', 500);
    act(() => {
      callbacks.onError(apiError);
    });
    await waitFor(() => {
      const errorMsg = result.current.messages.find((m) => m.status === 'done' && m.role === 'ai' && m.kind === 'text');
      expect(errorMsg?.content).toBe('서버 에러');
    });
  });

  it('completeTyping 호출 시 해당 메시지의 status가 done이 된다', () => {
    const { result } = renderHook(() => useChatMessages(), { wrapper: createWrapper() });
    act(() => {
      result.current.send('질문');
    });
    const [, callbacks] = mutateMock.mock.calls[0];
    act(() => {
      callbacks.onSuccess({ answer: '답변', used: {}, sources: [] });
    });
    const typingMsg = result.current.messages.find((m) => m.status === 'typing');
    expect(typingMsg).toBeDefined();
    act(() => {
      result.current.completeTyping(typingMsg!.id);
    });
    expect(result.current.messages.find((m) => m.id === typingMsg!.id)?.status).toBe('done');
  });
});
