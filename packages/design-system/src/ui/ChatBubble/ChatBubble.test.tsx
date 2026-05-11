import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { ChatBubble } from './ChatBubble';

describe('ChatBubble', () => {
  it('ai variant 텍스트를 렌더한다', () => {
    render(<ChatBubble variant="ai">안녕</ChatBubble>);
    expect(screen.getByText('안녕')).toBeInTheDocument();
  });

  it('user variant 텍스트를 렌더한다', () => {
    render(<ChatBubble variant="user">질문</ChatBubble>);
    expect(screen.getByText('질문')).toBeInTheDocument();
  });

  it('ai variant에서 recommendation 슬롯을 노출한다', () => {
    render(
      <ChatBubble variant="ai" recommendation="가격 8000원">
        본문
      </ChatBubble>
    );
    expect(screen.getByText('가격 8000원')).toBeInTheDocument();
  });

  it('ai variant에서 ragLabel 슬롯을 노출한다', () => {
    render(
      <ChatBubble variant="ai" ragLabel="RAG 기반 응답">
        본문
      </ChatBubble>
    );
    expect(screen.getByText('RAG 기반 응답')).toBeInTheDocument();
  });

  it('user variant에서는 recommendation을 노출하지 않는다', () => {
    render(
      <ChatBubble variant="user" recommendation="가격 8000원">
        질문
      </ChatBubble>
    );
    expect(screen.queryByText('가격 8000원')).not.toBeInTheDocument();
  });

  it('recommendation, ragLabel 모두 없으면 슬롯 컨테이너를 렌더하지 않는다', () => {
    const { container } = render(<ChatBubble variant="ai">본문</ChatBubble>);
    expect(container.querySelectorAll('div').length).toBe(2);
  });

  it('forwardRef로 div ref를 노출한다', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <ChatBubble variant="ai" ref={ref}>
        본문
      </ChatBubble>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('custom className을 추가한다', () => {
    const { container } = render(
      <ChatBubble variant="ai" className="custom">
        본문
      </ChatBubble>
    );
    expect(container.firstChild).toHaveClass('custom');
  });
});
