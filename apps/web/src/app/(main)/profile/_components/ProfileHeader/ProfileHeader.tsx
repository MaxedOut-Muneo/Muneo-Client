import * as styles from './ProfileHeader.css';

interface ProfileHeaderProps {
  initial: string;
  name: string;
  subtitle: string;
}

export const ProfileHeader = ({ initial, name, subtitle }: ProfileHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.avatar} aria-hidden={true}>
        {initial}
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </header>
  );
};
