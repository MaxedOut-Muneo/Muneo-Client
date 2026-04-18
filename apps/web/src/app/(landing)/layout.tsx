import { type ReactNode } from 'react';
import { FloatingChatButton } from './_components/FloatingChatButton/FloatingChatButton';
import { Footer } from './_components/Footer/Footer';
import { Header } from './_components/Header/Header';
import * as styles from './layout.css';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <Header />
      {children}
      <Footer />
      <FloatingChatButton />
    </div>
  );
}
