'use client';

import { type KeyboardEvent } from 'react';
import { input, sendButton, wrapper } from './ChatInput.css';

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const ChatInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = '질문을 입력하세요...',
  disabled = false,
  className,
}: ChatInputProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <div className={`${wrapper}${className ? ` ${className}` : ''}`}>
      <input
        className={input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="채팅 입력"
      />
      <button
        type="button"
        className={sendButton}
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        aria-label="전송"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12H19M13 6L19 12L13 18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
