'use client';

import { ChatBubble, ChatInput, CloseIconMdIcon, FloatingChat, FloatingMuneo, Logo2 } from '@muneo/design-system';
import { useState } from 'react';
import { useDelayedUnmount } from '@/hooks/useDelayedUnmount';
import {
  buttonContent,
  chatWrapper,
  chatWrapperExit,
  closeLabel,
  floatingButton,
  logoBadge,
  triggerIcon,
} from './FloatingChatLauncher.css';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome',
    role: 'ai',
    content: '안녕하세요! 인테리어 AI 상담 문어입니다. 무엇을 도와드릴까요?',
  },
];

const EXIT_DURATION = 220;
const CHAT_PANEL_ID = 'floating-chat-panel';

const createMessageId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? `u-${crypto.randomUUID()}`
    : `u-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const FloatingChatLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatMounted = useDelayedUnmount(isOpen, EXIT_DURATION);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }
    setMessages((prev) => [...prev, { id: createMessageId(), role: 'user', content: trimmed }]);
    setInput('');
  };

  const isExiting = chatMounted && !isOpen;

  return (
    <>
      {chatMounted && (
        <div id={CHAT_PANEL_ID} className={`${chatWrapper}${isExiting ? ` ${chatWrapperExit}` : ''}`}>
          <FloatingChat>
            <FloatingChat.Header
              logo={<Logo2 className={logoBadge} />}
              title="문어 AI 상담"
              subtitle="인테리어 시공 전문 AI"
              onMinimize={close}
              onClose={close}
            />
            <FloatingChat.Body>
              {messages.map((message) =>
                message.role === 'ai' ? (
                  <FloatingChat.AIMessage key={message.id} avatar={<Logo2 className={logoBadge} />}>
                    <ChatBubble variant="ai">{message.content}</ChatBubble>
                  </FloatingChat.AIMessage>
                ) : (
                  <FloatingChat.UserMessage key={message.id}>
                    <ChatBubble variant="user">{message.content}</ChatBubble>
                  </FloatingChat.UserMessage>
                )
              )}
            </FloatingChat.Body>
            <FloatingChat.Footer>
              <ChatInput value={input} onChange={setInput} onSubmit={handleSubmit} />
            </FloatingChat.Footer>
          </FloatingChat>
        </div>
      )}
      <button
        type="button"
        className={floatingButton}
        onClick={toggle}
        aria-label={isOpen ? 'AI 상담 챗 닫기' : 'AI 상담 챗 열기'}
        aria-expanded={isOpen}
        aria-controls={CHAT_PANEL_ID}
      >
        {isOpen ? (
          <span key="close" className={buttonContent}>
            <CloseIconMdIcon aria-hidden />
            <span className={closeLabel}>닫기</span>
          </span>
        ) : (
          <span key="trigger" className={buttonContent}>
            <FloatingMuneo className={triggerIcon} aria-hidden />
          </span>
        )}
      </button>
    </>
  );
};
