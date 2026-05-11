import { TextField } from './TextField';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    placeholder: '텍스트를 입력하세요',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: '이름', id: 'name' },
};

export const WithError: Story = {
  args: {
    label: '이메일',
    id: 'email',
    error: '올바른 이메일 형식이 아닙니다.',
    defaultValue: 'invalid',
  },
};

export const Disabled: Story = {
  args: { label: '비활성', disabled: true, value: '수정 불가' },
};

export const WithSuffix: Story = {
  args: { label: '평수', suffix: '평', placeholder: '0' },
};

export const Password: Story = {
  args: { label: '비밀번호', type: 'password', placeholder: '비밀번호를 입력하세요' },
};
