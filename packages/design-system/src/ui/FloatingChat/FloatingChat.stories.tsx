import { useState } from 'react';
import { FloatingChat } from './FloatingChat';
import Logo2 from '../../assets/icons/Logo2';
import { ChatBubble } from '../ChatBubble/ChatBubble';
import { ChatInput } from '../ChatInput/ChatInput';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/FloatingChat',
  component: FloatingChat,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { children: null },
} satisfies Meta<typeof FloatingChat>;

export default meta;
type Story = StoryObj<typeof meta>;

const logoBadge = { width: '100%', height: '100%', display: 'flex' } as const;

export const Default: Story = {
  render: () => {
    const [input, setInput] = useState('');
    return (
      <div style={{ width: 460, height: 680 }}>
        <FloatingChat>
          <FloatingChat.Header
            logo={<Logo2 style={logoBadge} />}
            title="문어 AI 상담"
            subtitle="인테리어 시공 전문 AI"
            onMinimize={() => alert('최소화')}
            onClose={() => alert('닫기')}
          />
          <FloatingChat.Body>
            <FloatingChat.AIMessage avatar={<Logo2 style={logoBadge} />}>
              <ChatBubble variant="ai">안녕하세요! 무엇을 도와드릴까요?</ChatBubble>
            </FloatingChat.AIMessage>
            <FloatingChat.UserMessage>
              <ChatBubble variant="user">도배 실크와 합지 차이가 뭔가요?</ChatBubble>
            </FloatingChat.UserMessage>
            <FloatingChat.AIMessage avatar={<Logo2 style={logoBadge} />}>
              <ChatBubble
                variant="ai"
                recommendation="실크: 평당 8,000~15,000원 | 합지: 4,000~8,000원"
                ragLabel="RAG 기반 응답"
              >
                실크벽지는 PVC 코팅으로 내구성이 우수하고, 합지벽지는 종이 재질로 가격이 저렴합니다.
              </ChatBubble>
            </FloatingChat.AIMessage>
          </FloatingChat.Body>
          <FloatingChat.Footer>
            <ChatInput value={input} onChange={setInput} onSubmit={() => setInput('')} />
          </FloatingChat.Footer>
        </FloatingChat>
      </div>
    );
  },
};

export const EmptyConversation: Story = {
  render: () => (
    <div style={{ width: 460, height: 680 }}>
      <FloatingChat>
        <FloatingChat.Header
          logo={<Logo2 style={logoBadge} />}
          title="문어 AI 상담"
          subtitle="인테리어 시공 전문 AI"
          onClose={() => {}}
        />
        <FloatingChat.Body>
          <FloatingChat.AIMessage avatar={<Logo2 style={logoBadge} />}>
            <ChatBubble variant="ai">안녕하세요! 무엇을 도와드릴까요?</ChatBubble>
          </FloatingChat.AIMessage>
        </FloatingChat.Body>
        <FloatingChat.Footer>
          <ChatInput value="" onChange={() => {}} onSubmit={() => {}} />
        </FloatingChat.Footer>
      </FloatingChat>
    </div>
  ),
};
