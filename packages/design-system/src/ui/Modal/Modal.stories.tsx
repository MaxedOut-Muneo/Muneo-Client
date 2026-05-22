import { Modal } from './Modal';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    isOpen: true,
    title: '해당 게시물을 삭제하시겠어요?',
    cancelLabel: '취소',
    confirmLabel: '확인',
    onCancel: () => undefined,
    onConfirm: () => undefined,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSubtitle: Story = {
  args: {
    subtitle: 'subtitle 1줄',
  },
};
