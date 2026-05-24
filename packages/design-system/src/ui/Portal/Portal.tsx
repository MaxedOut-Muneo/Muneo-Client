'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  container?: Element | DocumentFragment | null;
}

export const Portal = ({ children, container }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, container ?? document.body);
};
