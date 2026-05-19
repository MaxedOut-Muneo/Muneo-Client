import { redirect } from 'next/navigation';
import { SocialSignupSection } from '@/app/(auth)/_components/SocialSignupSection';
import * as styles from './page.css';

interface SocialSignupPageProps {
  searchParams: Promise<{ ticket?: string | string[] }>;
}

const SocialSignupPage = async ({ searchParams }: SocialSignupPageProps) => {
  const params = await searchParams;
  const ticket = Array.isArray(params.ticket) ? params.ticket[0] : params.ticket;

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
