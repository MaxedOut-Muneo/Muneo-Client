import Link, { type LinkProps } from 'next/link';
import { type AnchorHTMLAttributes, forwardRef } from 'react';

type TransitionLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & { viewTransition?: boolean };

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ viewTransition: _viewTransition, ...props }, ref) => <Link ref={ref} {...props} />
);

TransitionLink.displayName = 'TransitionLink';
