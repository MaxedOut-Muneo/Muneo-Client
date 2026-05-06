import { type DiagnosisItemData, type DiagnosisStatus } from '../../_types/analysis.types';
import * as styles from './DiagnosisItem.css';

const BADGE_CLASS: Record<DiagnosisStatus, string> = {
  정상: styles.badgeNormal,
  누락: styles.badgeMissing,
  미비: styles.badgeInsufficient,
  불분명: styles.badgeUnclear,
};

const ACTION_NOTE_CLASS: Record<DiagnosisStatus, string> = {
  정상: styles.actionNoteInfo,
  누락: styles.actionNoteDanger,
  미비: styles.actionNoteInfo,
  불분명: styles.actionNoteWarning,
};

interface DiagnosisItemProps {
  item: DiagnosisItemData;
}

export function DiagnosisItem({ item }: DiagnosisItemProps) {
  return (
    <div className={styles.item}>
      <span className={`${styles.badge} ${BADGE_CLASS[item.status]}`}>{item.status}</span>
      <div className={styles.texts}>
        <span className={styles.title}>{item.title}</span>
        {item.description && <span className={styles.description}>{item.description}</span>}
        {item.actionNote && (
          <span className={`${styles.actionNote} ${ACTION_NOTE_CLASS[item.status]}`}>ⓘ {item.actionNote}</span>
        )}
      </div>
    </div>
  );
}
