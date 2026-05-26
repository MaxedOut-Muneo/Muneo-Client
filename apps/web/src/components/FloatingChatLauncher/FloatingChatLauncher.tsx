'use client';

import { ChatBubble, ChatInput, CloseIconMdIcon, FloatingChat, FloatingMuneo, Logo2 } from '@muneo/design-system';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { CTA_EVENTS } from '@/constants/analyticsEvents';
import { useDelayedUnmount } from '@/hooks/useDelayedUnmount';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { trackCtaClick } from '@/lib/analytics';
import { useChatStore } from '@/store/chatStore';
import { type ChatMessage, useChatMessages } from './useChatMessages';
import {
  buttonContent,
  chatWrapper,
  chatWrapperExit,
  closeLabel,
  floatingButton,
  loadingDot,
  loadingDots,
  loginLink,
  loginPromptText,
  logoBadge,
  triggerIcon,
} from './FloatingChatLauncher.css';

const EXIT_DURATION = 220;
const CHAT_PANEL_ID = 'floating-chat-panel';

const shouldAnimateTyping = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const LoadingDots = () => (
  <span className={loadingDots} aria-label="답변 작성 중">
    <span className={loadingDot} />
    <span className={loadingDot} />
    <span className={loadingDot} />
  </span>
);

interface LoginRequiredBubbleProps {
  message: string;
  onLoginClick: (e: ReactMouseEvent<HTMLAnchorElement>) => void;
}

const LoginRequiredBubble = ({ message, onLoginClick }: LoginRequiredBubbleProps) => (
  <>
    <span className={loginPromptText}>{message}</span>
    <Link href="/login" className={loginLink} onClick={onLoginClick}>
      로그인하러 가기
    </Link>
  </>
);

interface TypingTextProps {
  content: string;
  onComplete: () => void;
  onProgress: () => void;
}

const TypingText = ({ content, onComplete, onProgress }: TypingTextProps) => {
  const { displayText, isTyping } = useTypingEffect(content, shouldAnimateTyping());

  useEffect(() => {
    onProgress();
  }, [displayText, onProgress]);

  useEffect(() => {
    if (!isTyping && displayText === content) {
      onComplete();
    }
  }, [isTyping, displayText, content, onComplete]);

  return <>{displayText}</>;
};

export const FloatingChatLauncher = () => {
  const router = useRouter();
  const { isOpen, pendingMessage, open, close } = useChatStore();
  const chatMounted = useDelayedUnmount(isOpen, EXIT_DURATION);
  const { messages, send, completeTyping, isPending } = useChatMessages();
  const [input, setInput] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasPendingRef = useRef(false);

  const toggle = () => {
    if (isOpen) {
      close();
      return;
    }
    trackCtaClick(CTA_EVENTS.chatOpen, { linkText: 'AI 상담 챗 열기', position: 'floating' });
    open();
  };

  const handleLoginClick = useCallback(
    (e: ReactMouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
        return;
      }
      e.preventDefault();
      trackCtaClick(CTA_EVENTS.chatLoginRedirect, {
        linkText: '로그인하러 가기',
        linkUrl: '/login',
        position: 'floating',
      });
      close();
      window.setTimeout(() => router.push('/login'), EXIT_DURATION);
    },
    [close, router]
  );

  useEffect(() => {
    if (isOpen && pendingMessage) {
      setInput(pendingMessage);
      useChatStore.setState({ pendingMessage: '' });
    }
  }, [isOpen, pendingMessage]);

  const scrollToBottom = useCallback(() => {
    const body = bodyRef.current;
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (!chatMounted) {
      return;
    }
    scrollToBottom();
  }, [messages, chatMounted, scrollToBottom]);

  useEffect(() => {
    if (wasPendingRef.current && !isPending) {
      inputRef.current?.focus();
    }
    wasPendingRef.current = isPending;
  }, [isPending]);

  const handleSubmit = () => {
    if (send(input)) {
      setInput('');
    }
  };

  const isExiting = chatMounted && !isOpen;

  const renderAIBubbleContent = (message: ChatMessage) => {
    if (message.status === 'loading') {
      return <LoadingDots />;
    }
    if (message.kind === 'login-required') {
      return <LoginRequiredBubble message={message.content} onLoginClick={handleLoginClick} />;
    }
    if (message.status === 'typing') {
      return (
        <TypingText
          content={message.content}
          onProgress={scrollToBottom}
          onComplete={() => completeTyping(message.id)}
        />
      );
    }
    return message.content;
  };

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
            <FloatingChat.Body ref={bodyRef}>
              {messages.map((message) =>
                message.role === 'ai' ? (
                  <FloatingChat.AIMessage key={message.id} avatar={<Logo2 className={logoBadge} />}>
                    <ChatBubble variant="ai">{renderAIBubbleContent(message)}</ChatBubble>
                  </FloatingChat.AIMessage>
                ) : (
                  <FloatingChat.UserMessage key={message.id}>
                    <ChatBubble variant="user">{message.content}</ChatBubble>
                  </FloatingChat.UserMessage>
                )
              )}
            </FloatingChat.Body>
            <FloatingChat.Footer>
              <ChatInput
                ref={inputRef}
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                disabled={isPending}
                autoFocus
              />
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
