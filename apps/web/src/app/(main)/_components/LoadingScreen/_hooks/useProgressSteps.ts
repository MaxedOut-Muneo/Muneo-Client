'use client';

import { useEffect, useState } from 'react';

export interface ProgressStep {
  delay: number;
  value: number;
  duration: number;
  easing: string;
}

interface ProgressState {
  value: number;
  duration: number;
  easing: string;
}

const INITIAL: ProgressState = { value: 0, duration: 0, easing: 'linear' };

/**
 * progressSteps 배열을 받아 각 step의 delay 후 progress 상태를 순차적으로 적용합니다.
 * 컴포넌트가 언마운트되면 모든 타이머를 정리합니다.
 */
export const useProgressSteps = (steps: ProgressStep[]): ProgressState => {
  const [progress, setProgress] = useState<ProgressState>(INITIAL);

  useEffect(() => {
    const timers = steps.map(({ delay, value, duration, easing }) =>
      setTimeout(() => setProgress({ value, duration, easing }), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [steps]);

  return progress;
};
