import { useDelayedFlag } from '../_hooks/useDelayedFlag';
import { useRotatingIndex } from '../_hooks/useRotatingIndex';
import * as styles from '../LoadingScreen.css';

interface Props {
  messages: string[];
  warningMessage: string;
  warningDelayMs: number;
}

export const RotatingMessage = ({ messages, warningMessage, warningDelayMs }: Props) => {
  const { index, exiting } = useRotatingIndex({ count: messages.length, interval: 4000, exitDuration: 270 });
  const showWarning = useDelayedFlag(warningDelayMs);

  return (
    <div className={styles.msgWrap} aria-live="polite" aria-atomic="true">
      {showWarning ? (
        <span key="warning" className={styles.msg}>
          {warningMessage}
        </span>
      ) : (
        <span key={index} className={`${styles.msg}${exiting ? ` ${styles.msgExiting}` : ''}`}>
          {messages[index]}
        </span>
      )}
    </div>
  );
};
