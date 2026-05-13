import { Suspense } from 'react';
import { HistoryContent } from './_components/HistoryContent/HistoryContent';
import * as styles from './page.css';

const HistoryPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>분석 이력</h1>
        <Suspense fallback={null}>
          <HistoryContent />
        </Suspense>
      </div>
    </div>
  );
};

export default HistoryPage;
