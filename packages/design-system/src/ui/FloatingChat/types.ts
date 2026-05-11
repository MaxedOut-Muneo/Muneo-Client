import { type ReactNode } from 'react';

export interface FloatingChatProps {
  children: ReactNode;
  className?: string;
}

export interface FloatingChatHeaderProps {
  logo?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  onMinimize?: () => void;
  onClose?: () => void;
  minimizeLabel?: string;
  closeLabel?: string;
  className?: string;
}

export interface FloatingChatBodyProps {
  children: ReactNode;
  className?: string;
}

export interface FloatingChatAIMessageProps {
  avatar?: ReactNode;
  children: ReactNode;
  className?: string;
}

export interface FloatingChatUserMessageProps {
  children: ReactNode;
  className?: string;
}

export interface FloatingChatFooterProps {
  children: ReactNode;
  className?: string;
}
