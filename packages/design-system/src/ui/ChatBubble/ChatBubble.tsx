'use client';

import { forwardRef, type ReactNode } from 'react';
import { chatBubbleRecipe, ragLabel, recommendation, recommendationGroup } from './ChatBubble.css';

export interface ChatBubbleProps {
  variant: 'ai' | 'user';
  children: ReactNode;
  recommendation?: ReactNode;
  ragLabel?: ReactNode;
  className?: string;
}

export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ variant, children, recommendation: recommendationNode, ragLabel: ragLabelNode, className }, ref) => {
    const showRecommendation = variant === 'ai' && (recommendationNode || ragLabelNode);

    return (
      <div ref={ref} className={`${chatBubbleRecipe({ variant })}${className ? ` ${className}` : ''}`}>
        <div>{children}</div>
        {showRecommendation && (
          <div className={recommendationGroup}>
            {recommendationNode && <div className={recommendation}>{recommendationNode}</div>}
            {ragLabelNode && <span className={ragLabel}>{ragLabelNode}</span>}
          </div>
        )}
      </div>
    );
  }
);

ChatBubble.displayName = 'ChatBubble';
