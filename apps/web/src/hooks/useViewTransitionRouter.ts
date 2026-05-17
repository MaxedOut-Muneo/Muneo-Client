'use client';

import { useRouter } from 'next/navigation';

export const useViewTransitionRouter = () => {
  const router = useRouter();

  const push = (href: string) => {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => router.push(href));
      return;
    }
    router.push(href);
  };

  const prefetch = (href: string) => {
    router.prefetch(href);
  };

  return { push, prefetch };
};
