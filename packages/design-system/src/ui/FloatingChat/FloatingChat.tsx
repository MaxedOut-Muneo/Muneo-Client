'use client';

import { forwardRef } from 'react';
import {
  type FloatingChatAIMessageProps,
  type FloatingChatBodyProps,
  type FloatingChatFooterProps,
  type FloatingChatHeaderProps,
  type FloatingChatProps,
  type FloatingChatUserMessageProps,
} from './types';
import CloseIconMdIcon from '../../assets/icons/CloseIconMdIcon';
import RemoveMinusIcon from '../../assets/icons/RemoveMinusIcon';
import {
  aiRow,
  avatar,
  avatarImg,
  body,
  footer,
  header,
  headerActions,
  headerLeft,
  iconButton,
  logo,
  logoImg,
  root,
  subtitle,
  title,
  titleBlock,
  userRow,
} from './FloatingChat.css';

type FloatingChatComponent = ReturnType<typeof forwardRef<HTMLDivElement, FloatingChatProps>> & {
  Header: typeof FloatingChatHeader;
  Body: typeof FloatingChatBody;
  AIMessage: typeof FloatingChatAIMessage;
  UserMessage: typeof FloatingChatUserMessage;
  Footer: typeof FloatingChatFooter;
};

const FloatingChatRoot = forwardRef<HTMLDivElement, FloatingChatProps>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={`${root}${className ? ` ${className}` : ''}`} role="dialog" aria-label="AI 채팅">
      {children}
    </div>
  );
});
FloatingChatRoot.displayName = 'FloatingChat';

const FloatingChatHeader = forwardRef<HTMLDivElement, FloatingChatHeaderProps>(
  (
    {
      logoSrc,
      logoAlt = '',
      logo: logoNode,
      title: titleNode,
      subtitle: subtitleNode,
      onMinimize,
      onClose,
      minimizeLabel = '최소화',
      closeLabel = '닫기',
      className,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={`${header}${className ? ` ${className}` : ''}`}>
        <div className={headerLeft}>
          <div className={logo}>
            {logoNode ?? (logoSrc ? <img className={logoImg} src={logoSrc} alt={logoAlt} /> : null)}
          </div>
          <div className={titleBlock}>
            <span className={title}>{titleNode}</span>
            {subtitleNode && <span className={subtitle}>{subtitleNode}</span>}
          </div>
        </div>
        <div className={headerActions}>
          {onMinimize && (
            <button type="button" className={iconButton} onClick={onMinimize} aria-label={minimizeLabel}>
              <RemoveMinusIcon aria-hidden />
            </button>
          )}
          {onClose && (
            <button type="button" className={iconButton} onClick={onClose} aria-label={closeLabel}>
              <CloseIconMdIcon aria-hidden />
            </button>
          )}
        </div>
      </div>
    );
  }
);
FloatingChatHeader.displayName = 'FloatingChat.Header';

const FloatingChatBody = forwardRef<HTMLDivElement, FloatingChatBodyProps>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={`${body}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
});
FloatingChatBody.displayName = 'FloatingChat.Body';

const FloatingChatAIMessage = forwardRef<HTMLDivElement, FloatingChatAIMessageProps>(
  ({ avatarSrc, avatarAlt = '', avatar: avatarNode, children, className }, ref) => {
    return (
      <div ref={ref} className={`${aiRow}${className ? ` ${className}` : ''}`}>
        <div className={avatar}>
          {avatarNode ?? (avatarSrc ? <img className={avatarImg} src={avatarSrc} alt={avatarAlt} /> : null)}
        </div>
        {children}
      </div>
    );
  }
);
FloatingChatAIMessage.displayName = 'FloatingChat.AIMessage';

const FloatingChatUserMessage = forwardRef<HTMLDivElement, FloatingChatUserMessageProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={`${userRow}${className ? ` ${className}` : ''}`}>
        {children}
      </div>
    );
  }
);
FloatingChatUserMessage.displayName = 'FloatingChat.UserMessage';

const FloatingChatFooter = forwardRef<HTMLDivElement, FloatingChatFooterProps>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={`${footer}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
});
FloatingChatFooter.displayName = 'FloatingChat.Footer';

export const FloatingChat = FloatingChatRoot as FloatingChatComponent;
FloatingChat.Header = FloatingChatHeader;
FloatingChat.Body = FloatingChatBody;
FloatingChat.AIMessage = FloatingChatAIMessage;
FloatingChat.UserMessage = FloatingChatUserMessage;
FloatingChat.Footer = FloatingChatFooter;
