import * as styles from '../LoadingScreen.css';

interface Props {
  footerText: string;
  onCancel: () => void;
}

export const LoadingFooter = ({ footerText, onCancel }: Props) => (
  <div className={styles.footer}>
    <span className={styles.footerText}>{footerText}</span>
    <button type="button" className={styles.cancelBtn} onClick={onCancel}>
      취소
    </button>
  </div>
);
