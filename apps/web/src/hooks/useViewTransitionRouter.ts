'use client';

import { useRouter } from 'next/navigation';

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

export const useViewTransitionRouter = () => {
  const router = useRouter();

  const push = (href: string) => {
    const doc = document as ViewTransitionDocument;
    if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(() => router.push(href));
      return;
    }
    router.push(href);
  };

  const prefetch = (href: string) => {
    router.prefetch(href);
  };

  return { push, prefetch };
};
