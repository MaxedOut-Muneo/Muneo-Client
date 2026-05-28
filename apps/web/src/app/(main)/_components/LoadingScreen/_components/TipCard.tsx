import { useRotatingIndex } from '../_hooks/useRotatingIndex';
import * as styles from '../LoadingScreen.css';

interface Props {
  tips: string[];
}

export const TipCard = ({ tips }: Props) => {
  const { index, exiting } = useRotatingIndex({ count: tips.length, interval: 8000, exitDuration: 330 });

  return (
    <div key={index} className={`${styles.tipCard}${exiting ? ` ${styles.tipCardExiting}` : ''}`}>
      <div className={styles.tipHeader}>
        <span className={styles.tipLabel}>💡 알아두면 좋아요</span>
        <span className={styles.tipCounter}>
          {index + 1} / {tips.length}
        </span>
      </div>
      <p className={styles.tipText}>{tips[index]}</p>
      <div className={styles.tipProgressTrack}>
        <div className={styles.tipProgressFill} style={{ width: `${((index + 1) / tips.length) * 100}%` }} />
      </div>
    </div>
  );
};
