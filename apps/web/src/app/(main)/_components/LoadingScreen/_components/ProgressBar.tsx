import { type ProgressStep, useProgressSteps } from '../_hooks/useProgressSteps';
import * as styles from '../LoadingScreen.css';

interface Props {
  steps: ProgressStep[];
}

export const ProgressBar = ({ steps }: Props) => {
  const { value, duration, easing } = useProgressSteps(steps);

  return (
    <div
      className={styles.progressWrap}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="분석 진행률"
    >
      <div
        className={styles.progressFill}
        style={{ width: `${value}%`, transition: `width ${duration}ms ${easing}` }}
      />
    </div>
  );
};
