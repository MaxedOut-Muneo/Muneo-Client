import { type Metadata } from 'next';
import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo';
import { LoginSection } from '../_components/LoginSection';
import * as styles from './page.css';

export const metadata: Metadata = {
  title: '로그인',
  description: `${SITE_NAME}에 로그인하고 인테리어 견적·진단을 시작하세요. ${SITE_DESCRIPTION}`,
  alternates: { canonical: '/login' },
  openGraph: {
    title: `로그인 | ${SITE_NAME}`,
    url: '/login',
  },
  twitter: {
    title: `로그인 | ${SITE_NAME}`,
  },
};

const LoginPage = () => (
  <div className={styles.wrapper}>
    <LoginSection />
  </div>
);

export default LoginPage;
