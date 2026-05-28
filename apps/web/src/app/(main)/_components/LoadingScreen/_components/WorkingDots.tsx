import * as styles from '../LoadingScreen.css';

const DOT_DELAYS = ['0ms', '160ms', '320ms'];

export const WorkingDots = () => (
  <div className={styles.workingDots} aria-hidden="true">
    {DOT_DELAYS.map((delay, i) => (
      <span key={i} className={styles.workingDot} style={{ animationDelay: delay }} />
    ))}
  </div>
);
