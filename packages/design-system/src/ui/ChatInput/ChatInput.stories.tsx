import { useState } from 'react';
import { ChatInput } from './ChatInput';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
  args: {
    value: '',
    onChange: () => {},
    onSubmit: () => {},
  },
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 360 }}>
        <ChatInput
          value={value}
          onChange={setValue}
          onSubmit={() => {
            alert(`전송: ${value}`);
            setValue('');
          }}
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('도배 가격이 궁금해요');
    return (
      <div style={{ width: 360 }}>
        <ChatInput value={value} onChange={setValue} onSubmit={() => setValue('')} />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <ChatInput value="비활성 입력" onChange={() => {}} onSubmit={() => {}} disabled />
    </div>
  ),
};
