'use client';

import { useRouter } from 'next/navigation';
import { SignupSection } from '../_components/SignupSection';
import * as styles from './page.css';

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <SignupSection onLogoClick={() => router.push('/')} onLogin={() => router.push('/login')} />
    </div>
  );
}
