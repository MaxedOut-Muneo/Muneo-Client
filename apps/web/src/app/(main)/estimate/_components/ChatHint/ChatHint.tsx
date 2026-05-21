'use client';

import { useDelayedUnmount } from '@/hooks/useDelayedUnmount';
import { useChatStore } from '@/store/chatStore';
import * as styles from './ChatHint.css';

interface ChatHintProps {
  visible: boolean;
  message?: string;
}

export const ChatHint = ({ visible, message }: ChatHintProps) => {
  const mounted = useDelayedUnmount(visible, 180);
  const { open } = useChatStore();
  const isExiting = mounted && !visible;

  if (!mounted) {return null;}

  return (
    <div className={`${styles.wrap}${isExiting ? ` ${styles.wrapExit}` : ''}`}>
      <span className={styles.text}>잘 모르셔도 괜찮아요.</span>
      <button type="button" className={styles.btn} onClick={() => open(message)}>
        AI에게 물어보기
      </button>
    </div>
  );
};
