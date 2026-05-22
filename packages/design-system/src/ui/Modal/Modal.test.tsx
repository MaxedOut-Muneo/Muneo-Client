import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('is hidden when closed', () => {
    render(<Modal isOpen={false} title="삭제하시겠어요?" onCancel={vi.fn()} onConfirm={vi.fn()} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title without requiring subtitle', () => {
    render(<Modal isOpen title="해당 게시물을 삭제하시겠어요?" onCancel={vi.fn()} onConfirm={vi.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('해당 게시물을 삭제하시겠어요?')).toBeInTheDocument();
  });

  it('calls action handlers', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const onConfirm = vi.fn();

    render(<Modal isOpen title="삭제하시겠어요?" onCancel={onCancel} onConfirm={onConfirm} />);

    await user.click(screen.getByRole('button', { name: '취소' }));
    await user.click(screen.getByRole('button', { name: '확인' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
