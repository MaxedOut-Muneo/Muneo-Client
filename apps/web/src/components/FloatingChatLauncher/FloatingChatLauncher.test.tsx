import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useChatStore } from '@/store/chatStore';
import { FloatingChatLauncher } from './FloatingChatLauncher';

const EXIT_BUFFER_MS = 400;

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock('@/api/chatbot', () => ({
  useAskChatbot: () => ({
    mutate: (
      _vars: { question: string },
      options?: { onSuccess?: (data: { answer: string }) => void; onError?: (error: unknown) => void }
    ) => {
      options?.onSuccess?.({ answer: 'AI 응답입니다' });
    },
    isPending: false,
  }),
}));

const renderLauncher = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return render(<FloatingChatLauncher />, { wrapper });
};

describe('FloatingChatLauncher', () => {
  beforeEach(() => {
    useChatStore.setState({ isOpen: false, pendingMessage: '' });
  });
  it('초기 상태에서 트리거 버튼을 렌더한다', () => {
    renderLauncher();
    expect(screen.getByLabelText('AI 상담 챗 열기')).toBeInTheDocument();
    expect(screen.queryByLabelText('AI 상담 챗 닫기')).not.toBeInTheDocument();
  });

  it('트리거 클릭 시 챗 패널과 닫기 버튼을 노출한다', async () => {
    const user = userEvent.setup();
    renderLauncher();
    await user.click(screen.getByLabelText('AI 상담 챗 열기'));
    expect(screen.getByLabelText('AI 상담 챗 닫기')).toBeInTheDocument();
    expect(screen.getByText(/안녕하세요! 인테리어 AI 상담 문어/)).toBeInTheDocument();
  });

  it('닫기 클릭 후 EXIT_DURATION 경과하면 챗이 unmount된다', async () => {
    const user = userEvent.setup();
    renderLauncher();
    await user.click(screen.getByLabelText('AI 상담 챗 열기'));
    await user.click(screen.getByLabelText('AI 상담 챗 닫기'));

    await waitFor(
      () => {
        expect(screen.queryByText(/안녕하세요! 인테리어 AI 상담 문어/)).not.toBeInTheDocument();
      },
      { timeout: EXIT_BUFFER_MS }
    );
    expect(screen.getByLabelText('AI 상담 챗 열기')).toBeInTheDocument();
  });

  it('사용자가 입력한 메시지를 messages에 추가한다', async () => {
    const user = userEvent.setup();
    renderLauncher();
    await user.click(screen.getByLabelText('AI 상담 챗 열기'));
    const input = screen.getByLabelText('채팅 입력');
    await user.type(input, '도배 가격{Enter}');
    expect(screen.getByText('도배 가격')).toBeInTheDocument();
  });

  it('공백만 있는 입력은 메시지를 추가하지 않는다', async () => {
    const user = userEvent.setup();
    renderLauncher();
    await user.click(screen.getByLabelText('AI 상담 챗 열기'));
    const input = screen.getByLabelText('채팅 입력');
    await user.type(input, '   {Enter}');
    expect(screen.queryByText('   ')).not.toBeInTheDocument();
    expect((input as HTMLInputElement).value).toBe('   ');
  });

  it('메시지 전송 후 입력 필드가 비워진다', async () => {
    const user = userEvent.setup();
    renderLauncher();
    await user.click(screen.getByLabelText('AI 상담 챗 열기'));
    const input = screen.getByLabelText('채팅 입력') as HTMLInputElement;
    await user.type(input, '질문입니다{Enter}');
    expect(input.value).toBe('');
  });

  it('전송 성공 시 AI 응답이 표시된다', async () => {
    const user = userEvent.setup();
    renderLauncher();
    await user.click(screen.getByLabelText('AI 상담 챗 열기'));
    const input = screen.getByLabelText('채팅 입력');
    await user.type(input, '질문{Enter}');
    await waitFor(() => {
      expect(screen.getByText('AI 응답입니다')).toBeInTheDocument();
    });
  });

  it('헤더의 닫기 버튼도 챗을 닫는다', async () => {
    const user = userEvent.setup();
    renderLauncher();
    await user.click(screen.getByLabelText('AI 상담 챗 열기'));
    await user.click(screen.getByLabelText('닫기'));

    await waitFor(
      () => {
        expect(screen.getByLabelText('AI 상담 챗 열기')).toBeInTheDocument();
      },
      { timeout: EXIT_BUFFER_MS }
    );
  });
});
