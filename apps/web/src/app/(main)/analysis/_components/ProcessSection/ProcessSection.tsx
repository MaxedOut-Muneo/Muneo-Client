import { type ProcessSectionData } from '../../_types/analysis.types';
import { DiagnosisItem } from '../DiagnosisItem/DiagnosisItem';
import * as styles from './ProcessSection.css';

interface ProcessSectionProps {
  section: ProcessSectionData;
}

export function ProcessSection({ section }: ProcessSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.chevron}>▼</span>
        <span className={styles.sectionName}>{section.name}</span>
      </div>
      <div className={styles.itemList}>
        {section.items.map((item) => (
          <DiagnosisItem key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.divider} />
    </div>
  );
}
