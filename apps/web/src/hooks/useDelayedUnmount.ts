'use client';

import { useEffect, useState } from 'react';

export const useDelayedUnmount = (active: boolean, exitDurationMs: number): boolean => {
  const [mounted, setMounted] = useState(active);

  useEffect(() => {
    if (active) {
      setMounted(true);
      return;
    }
    if (!mounted) {
      return;
    }
    const timer = window.setTimeout(() => setMounted(false), exitDurationMs);
    return () => window.clearTimeout(timer);
  }, [active, exitDurationMs, mounted]);

  return mounted;
};
