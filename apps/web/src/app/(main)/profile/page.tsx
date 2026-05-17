import { ProfileCard } from './_components/ProfileCard/ProfileCard';
import { type ProfileUser } from './_types/profile.types';
import * as styles from './page.css';

const MOCK_PROFILE: ProfileUser = {
  signupType: 'social',
  provider: 'kakao',
  initial: '김',
  name: '김민수',
  role: '일반 사용자',
};

const ProfilePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>내 정보</h1>
        <ProfileCard user={MOCK_PROFILE} />
      </div>
    </div>
  );
};

export default ProfilePage;
