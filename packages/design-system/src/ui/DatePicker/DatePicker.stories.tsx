import { useState } from 'react';
import { DatePicker } from './DatePicker';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [start, setStart] = useState<Date | undefined>();
    const [end, setEnd] = useState<Date | undefined>();
    return (
      <div style={{ width: 280 }}>
        <DatePicker
          startDate={start}
          endDate={end}
          onChange={(s, e) => {
            setStart(s);
            setEnd(e);
          }}
        />
      </div>
    );
  },
};

export const WithInitialRange: Story = {
  render: () => {
    const [start, setStart] = useState<Date | undefined>(new Date(2025, 0, 1));
    const [end, setEnd] = useState<Date | undefined>(new Date(2025, 0, 15));
    return (
      <div style={{ width: 280 }}>
        <DatePicker
          startDate={start}
          endDate={end}
          onChange={(s, e) => {
            setStart(s);
            setEnd(e);
          }}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <DatePicker placeholder="비활성 상태" disabled />
    </div>
  ),
};
