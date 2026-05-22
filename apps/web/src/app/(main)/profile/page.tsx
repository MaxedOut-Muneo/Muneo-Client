import { redirect } from 'next/navigation';
import { getServerMe } from '@/api/user/server';
import { type AuthUser } from '@/types/auth';
import { ProfileCard } from './_components/ProfileCard/ProfileCard';
import { type ProfileUser } from './_types/profile.types';
import * as styles from './page.css';

const ROLE_LABEL: Record<AuthUser['role'], string> = {
  USER: '일반 사용자',
  ADMIN: '관리자',
};

const toProfileUser = (user: AuthUser): ProfileUser => {
  const common = {
    initial: user.name.charAt(0),
    name: user.name,
    role: ROLE_LABEL[user.role],
    email: user.email,
    phone: user.phoneNumber,
    birth: user.birthDate,
  };

  if (user.authProvider === 'KAKAO') {
    return { ...common, signupType: 'social', provider: 'kakao' };
  }
  return { ...common, signupType: 'self' };
};

const ProfilePage = async () => {
  const user = await getServerMe().catch(() => null);
  if (!user) {
    redirect('/login');
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>내 정보</h1>
        <ProfileCard user={toProfileUser(user)} />
      </div>
    </div>
  );
};

export default ProfilePage;
