'use client';

import { useRouter } from 'next/navigation';
import { SignupSection } from '../_components/SignupSection';
import * as styles from './page.css';

const SignupPage = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <SignupSection onLogoClick={() => router.push('/')} onLogin={() => router.push('/login')} />
    </div>
  );
};

export default SignupPage;
