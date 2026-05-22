import * as styles from './loading.css';

const HomeLoading = () => (
  <div className={styles.page}>
    <div className={styles.content}>
      <div className={styles.greetingSection}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonSubtitle} />
      </div>

      <div className={styles.summaryRow}>
        <div className={styles.skeletonCard} />
        <div className={styles.skeletonCard} />
        <div className={styles.skeletonCard} />
      </div>

      <div className={styles.skeletonTable} />
    </div>
  </div>
);

export default HomeLoading;
