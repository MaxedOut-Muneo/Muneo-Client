import { HistoryContent } from './_components/HistoryContent/HistoryContent';
import * as styles from './page.css';

export default function HistoryPage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>분석 이력</h1>
        <HistoryContent />
      </div>
    </div>
  );
}
