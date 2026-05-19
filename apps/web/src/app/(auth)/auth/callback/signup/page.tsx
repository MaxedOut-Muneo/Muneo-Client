import { redirect } from 'next/navigation';
import { SocialSignupSection } from '@/app/(auth)/_components/SocialSignupSection';
import * as styles from './page.css';

interface SocialSignupPageProps {
  searchParams: Promise<{ ticket?: string }>;
}

const SocialSignupPage = async ({ searchParams }: SocialSignupPageProps) => {
  const { ticket } = await searchParams;

  if (!ticket) {
    redirect('/login');
  }

  return (
    <div className={styles.wrapper}>
      <SocialSignupSection ticket={ticket} />
    </div>
  );
};

export default SocialSignupPage;
