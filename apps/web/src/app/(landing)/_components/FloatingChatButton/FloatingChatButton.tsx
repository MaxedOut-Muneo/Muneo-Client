import Image from 'next/image';
import * as styles from './FloatingChatButton.css';

export const FloatingChatButton = () => {
  return (
    <button type="button" className={styles.button} aria-label="AI 챗봇 열기">
      <Image src="/floating-icon.svg" width={56} height={56} alt="" />
    </button>
  );
};
