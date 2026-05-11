import { useState } from 'react';
import { Dropdown } from './Dropdown';
import type { Meta, StoryObj } from '@storybook/react-vite';

const OPTIONS = [
  { value: 'apartment', label: '아파트' },
  { value: 'house', label: '단독주택' },
  { value: 'villa', label: '빌라' },
  { value: 'officetel', label: '오피스텔' },
];

const meta = {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: { options: OPTIONS },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div style={{ width: 240 }}>
        <Dropdown options={OPTIONS} value={value} onChange={setValue} placeholder="주거 형태 선택" />
      </div>
    );
  },
};

export const Selected: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>('apartment');
    return (
      <div style={{ width: 240 }}>
        <Dropdown options={OPTIONS} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Dropdown options={OPTIONS} placeholder="선택 불가" disabled />
    </div>
  ),
};
