import { type ReactNode } from 'react';
import { Footer } from './_components/Footer/Footer';
import { Header } from './_components/Header/Header';
import * as styles from './layout.css';

const LandingLayout = ({ children, modal }: { children: ReactNode; modal: ReactNode }) => {
  return (
    <div className={styles.page}>
      <Header />
      {children}
      <Footer />
      {modal}
    </div>
  );
};

export default LandingLayout;
