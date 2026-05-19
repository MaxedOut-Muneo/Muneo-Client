import { Logo } from '@muneo/design-system';
import Link from 'next/link';
import { TAGLINE } from '@/constants/app';
import * as styles from '../authModal.css';

interface AuthModalHeaderProps {
  onLogoClick?: () => void;
}

export const AuthModalHeader = ({ onLogoClick }: AuthModalHeaderProps) => (
  <div className={styles.logoSection}>
    <span className={styles.tagline}>{TAGLINE}</span>
    {onLogoClick ? (
      <button type="button" className={styles.logoButton} onClick={onLogoClick} aria-label="홈으로 이동">
        <Logo width={118} height={38} />
      </button>
    ) : (
      <Link href="/" className={styles.logoButton} aria-label="홈으로 이동">
        <Logo width={118} height={38} />
      </Link>
    )}
  </div>
);
