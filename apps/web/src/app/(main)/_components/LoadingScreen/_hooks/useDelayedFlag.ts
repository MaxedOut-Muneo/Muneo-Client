'use client';

import { useEffect, useState } from 'react';

/**
 * delayMs 이후 true가 되는 플래그를 반환합니다.
 * 컴포넌트가 언마운트되면 타이머를 정리합니다.
 *
 * @example
 * const showWarning = useDelayedFlag(30_000); // 30초 후 true
 */
export const useDelayedFlag = (delayMs: number): boolean => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFlag(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  return flag;
};
