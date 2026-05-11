import { ChatBubble } from './ChatBubble';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/ChatBubble',
  component: ChatBubble,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['ai', 'user'] },
  },
  args: {
    variant: 'ai',
    children: '메시지',
  },
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AI: Story = {
  args: {
    variant: 'ai',
    children: '안녕하세요! 인테리어 AI 상담 문어입니다. 무엇을 도와드릴까요?',
  },
};

export const User: Story = {
  args: {
    variant: 'user',
    children: '도배 실크와 합지 차이가 뭔가요?',
  },
};

export const AIWithRecommendation: Story = {
  args: {
    variant: 'ai',
    children: '실크벽지는 PVC 코팅으로 내구성이 우수하고, 합지벽지는 종이 재질로 가격이 저렴합니다.',
    recommendation: '실크: 평당 8,000~15,000원 | 합지: 4,000~8,000원',
    ragLabel: 'RAG 기반 응답',
  },
};

export const Conversation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 460 }}>
      <ChatBubble variant="ai">안녕하세요! 무엇을 도와드릴까요?</ChatBubble>
      <div style={{ alignSelf: 'flex-end' }}>
        <ChatBubble variant="user">24평 아파트 도배 비용?</ChatBubble>
      </div>
      <ChatBubble variant="ai" recommendation="실크 120~150만원 | 합지 70~100만원" ragLabel="RAG 기반 응답">
        24평 기준 실크벽지 전체 도배는 약 120~150만원, 합지벽지는 70~100만원이 일반적입니다.
      </ChatBubble>
    </div>
  ),
};
