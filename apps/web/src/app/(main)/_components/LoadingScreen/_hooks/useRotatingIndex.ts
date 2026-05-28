'use client';

import { useEffect, useRef, useState } from 'react';

interface Options {
  /** 항목 개수 */
  count: number;
  /** 다음 항목으로 넘어가는 간격 (ms) */
  interval: number;
  /** exit 애니메이션 지속 시간 (ms) — 이 시간 후 인덱스가 바뀜 */
  exitDuration: number;
}

interface RotatingIndex {
  index: number;
  exiting: boolean;
}

/**
 * N개 항목을 일정 간격으로 순환하며, 전환 직전에 exiting 플래그를 노출합니다.
 *
 * @example
 * const { index, exiting } = useRotatingIndex({ count: messages.length, interval: 4000, exitDuration: 270 });
 */
export const useRotatingIndex = ({ count, interval, exitDuration }: Options): RotatingIndex => {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const tidRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (tidRef.current !== null) {
        clearTimeout(tidRef.current);
      }
      setExiting(true);
      const tid = setTimeout(() => {
        setIndex((i) => (i + 1) % count);
        setExiting(false);
        tidRef.current = null;
      }, exitDuration);
      tidRef.current = tid;
    }, interval);

    return () => {
      clearInterval(id);
      if (tidRef.current !== null) {
        clearTimeout(tidRef.current);
        tidRef.current = null;
      }
    };
  }, [count, interval, exitDuration]);

  return { index, exiting };
};
