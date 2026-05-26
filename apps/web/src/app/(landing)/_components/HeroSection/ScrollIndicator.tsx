'use client';

import { useRef } from 'react';
import { scrollIndicator } from './HeroSection.css';

export const ScrollIndicator = () => {
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    const currentSection = ref.current?.closest('section');
    const nextSection = currentSection?.nextElementSibling;
    if (!(nextSection instanceof HTMLElement)) {
      return;
    }
    const reduceMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    nextSection.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <button ref={ref} type="button" className={scrollIndicator} onClick={handleClick} aria-label="다음 섹션으로 이동">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 9L12 15L18 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
