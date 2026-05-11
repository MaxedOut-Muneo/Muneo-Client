import { useState } from 'react';
import { SelectButton } from './SelectButton';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/SelectButton',
  component: SelectButton,
  tags: ['autodocs'],
  args: {
    children: '선택지',
    selected: false,
  },
} satisfies Meta<typeof SelectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {};

export const Selected: Story = { args: { selected: true } };

export const Disabled: Story = { args: { disabled: true } };

const OPTIONS = ['도배', '바닥재', '욕실', '주방'];

export const Group: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {OPTIONS.map((option) => (
          <SelectButton
            key={option}
            selected={selected === option}
            onClick={() => setSelected(option === selected ? null : option)}
          >
            {option}
          </SelectButton>
        ))}
      </div>
    );
  },
};
