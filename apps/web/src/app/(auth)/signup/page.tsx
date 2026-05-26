import { type Metadata } from 'next';
import { SITE_NAME } from '@/constants/seo';
import { SignupSection } from '../_components/SignupSection';
import * as styles from './page.css';

export const metadata: Metadata = {
  title: '회원가입',
  description: `${SITE_NAME} 무료 회원가입. AI 인테리어 견적 검토와 리스크 진단을 바로 시작할 수 있어요.`,
  alternates: { canonical: '/signup' },
  openGraph: {
    title: `회원가입 | ${SITE_NAME}`,
    url: '/signup',
  },
  twitter: {
    title: `회원가입 | ${SITE_NAME}`,
  },
};

const SignupPage = () => (
  <div className={styles.wrapper}>
    <SignupSection />
  </div>
);

export default SignupPage;
