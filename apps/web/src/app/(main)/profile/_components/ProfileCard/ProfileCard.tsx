import { type ProfileUser } from '../../_types/profile.types';
import { ProfileForm } from '../ProfileForm/ProfileForm';
import { ProfileHeader } from '../ProfileHeader/ProfileHeader';
import * as styles from './ProfileCard.css';

interface ProfileCardProps {
  user: ProfileUser;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <section className={styles.card}>
      <div className={styles.inner}>
        <ProfileHeader initial={user.initial} name={user.name} subtitle={user.role} />
        <ProfileForm user={user} />
      </div>
    </section>
  );
};
