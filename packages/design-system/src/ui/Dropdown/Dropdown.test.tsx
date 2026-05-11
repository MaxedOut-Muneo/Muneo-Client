import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Dropdown } from './Dropdown';

const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

describe('Dropdown', () => {
  it('값이 없으면 placeholder를 노출한다', () => {
    render(<Dropdown options={OPTIONS} placeholder="선택" />);
    expect(screen.getByRole('button')).toHaveTextContent('선택');
  });

  it('값이 있으면 해당 옵션 라벨을 노출한다', () => {
    render(<Dropdown options={OPTIONS} value="b" />);
    expect(screen.getByRole('button')).toHaveTextContent('Option B');
  });

  it('트리거 클릭 시 listbox가 열린다', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={OPTIONS} />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('옵션 클릭 시 onChange를 호출한다', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Dropdown options={OPTIONS} onChange={onChange} />);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Option B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('옵션에서 Enter 키로 선택할 수 있다', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Dropdown options={OPTIONS} onChange={onChange} />);
    await user.click(screen.getByRole('button'));
    const option = screen.getByText('Option A').closest('li');
    option?.focus();
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('옵션에서 Space 키로 선택할 수 있다', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Dropdown options={OPTIONS} onChange={onChange} />);
    await user.click(screen.getByRole('button'));
    const option = screen.getByText('Option B').closest('li');
    option?.focus();
    await user.keyboard(' ');
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('외부 mousedown 시 닫힌다', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={OPTIONS} />);
    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('listbox')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('disabled일 때 클릭해도 열리지 않는다', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={OPTIONS} disabled />);
    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
