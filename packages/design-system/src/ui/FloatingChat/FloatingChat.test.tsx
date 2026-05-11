import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FloatingChat } from './FloatingChat';

describe('FloatingChat', () => {
  it('Header, Body, Footer 컴파운드를 함께 렌더한다', () => {
    render(
      <FloatingChat>
        <FloatingChat.Header title="채팅" />
        <FloatingChat.Body>본문</FloatingChat.Body>
        <FloatingChat.Footer>입력</FloatingChat.Footer>
      </FloatingChat>
    );
    expect(screen.getByText('채팅')).toBeInTheDocument();
    expect(screen.getByText('본문')).toBeInTheDocument();
    expect(screen.getByText('입력')).toBeInTheDocument();
  });

  it('Header subtitle을 노출한다', () => {
    render(
      <FloatingChat>
        <FloatingChat.Header title="제목" subtitle="부제" />
      </FloatingChat>
    );
    expect(screen.getByText('부제')).toBeInTheDocument();
  });

  it('onMinimize, onClose가 있으면 두 버튼을 모두 노출한다', () => {
    render(
      <FloatingChat>
        <FloatingChat.Header title="채팅" onMinimize={vi.fn()} onClose={vi.fn()} />
      </FloatingChat>
    );
    expect(screen.getByLabelText('최소화')).toBeInTheDocument();
    expect(screen.getByLabelText('닫기')).toBeInTheDocument();
  });

  it('핸들러가 없으면 액션 버튼을 노출하지 않는다', () => {
    render(
      <FloatingChat>
        <FloatingChat.Header title="채팅" />
      </FloatingChat>
    );
    expect(screen.queryByLabelText('최소화')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('닫기')).not.toBeInTheDocument();
  });

  it('닫기 클릭 시 onClose를 호출한다', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <FloatingChat>
        <FloatingChat.Header title="채팅" onClose={onClose} />
      </FloatingChat>
    );
    await user.click(screen.getByLabelText('닫기'));
    expect(onClose).toHaveBeenCalled();
  });

  it('AIMessage에 avatar와 children을 렌더한다', () => {
    render(
      <FloatingChat>
        <FloatingChat.Body>
          <FloatingChat.AIMessage avatar={<span>🐙</span>}>안녕</FloatingChat.AIMessage>
        </FloatingChat.Body>
      </FloatingChat>
    );
    expect(screen.getByText('🐙')).toBeInTheDocument();
    expect(screen.getByText('안녕')).toBeInTheDocument();
  });

  it('UserMessage children을 렌더한다', () => {
    render(
      <FloatingChat>
        <FloatingChat.Body>
          <FloatingChat.UserMessage>질문</FloatingChat.UserMessage>
        </FloatingChat.Body>
      </FloatingChat>
    );
    expect(screen.getByText('질문')).toBeInTheDocument();
  });
});
