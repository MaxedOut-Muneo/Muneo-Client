import { type Metadata } from 'next';
import { type ReactNode } from 'react';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

const AuthCallbackLayout = ({ children }: { children: ReactNode }) => <>{children}</>;

export default AuthCallbackLayout;
