import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ChatInput } from './ChatInput';

describe('ChatInput', () => {
  it('기본 placeholder를 노출한다', () => {
    render(<ChatInput value="" onChange={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByLabelText('채팅 입력')).toHaveAttribute('placeholder', '질문을 입력하세요...');
  });

  it('입력 시 onChange를 호출한다', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<ChatInput value="" onChange={onChange} onSubmit={vi.fn()} />);
    await user.type(screen.getByLabelText('채팅 입력'), 'h');
    expect(onChange).toHaveBeenCalledWith('h');
  });

  it('값이 있을 때 Enter로 onSubmit을 호출한다', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ChatInput value="질문" onChange={vi.fn()} onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText('채팅 입력'), '{Enter}');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('빈 값에서 Enter는 onSubmit을 호출하지 않는다', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ChatInput value="" onChange={vi.fn()} onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText('채팅 입력'), '{Enter}');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('공백만 있는 값에서는 onSubmit을 호출하지 않는다', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ChatInput value="   " onChange={vi.fn()} onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText('채팅 입력'), '{Enter}');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('IME 조합 중 Enter는 무시된다', () => {
    const onSubmit = vi.fn();
    render(<ChatInput value="안" onChange={vi.fn()} onSubmit={onSubmit} />);
    const input = screen.getByLabelText('채팅 입력');
    fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('전송 버튼 클릭 시 onSubmit을 호출한다', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ChatInput value="질문" onChange={vi.fn()} onSubmit={onSubmit} />);
    await user.click(screen.getByLabelText('전송'));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('빈 값이면 전송 버튼이 비활성화된다', () => {
    render(<ChatInput value="" onChange={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByLabelText('전송')).toBeDisabled();
  });

  it('공백만 있는 값이면 전송 버튼이 비활성화된다', () => {
    render(<ChatInput value="   " onChange={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByLabelText('전송')).toBeDisabled();
  });

  it('disabled prop이면 전송 버튼이 비활성화된다', () => {
    render(<ChatInput value="질문" onChange={vi.fn()} onSubmit={vi.fn()} disabled />);
    expect(screen.getByLabelText('전송')).toBeDisabled();
  });
});
