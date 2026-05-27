import { Button } from '@muneo/design-system';
import { Card } from '@/components/Card';
import * as styles from '../UserDetail.css';

interface UserDangerZoneProps {
  isDeleted: boolean;
  isSelf: boolean;
  onDelete: () => void;
  onRestore: () => void;
}

export const UserDangerZone = ({ isDeleted, isSelf, onDelete, onRestore }: UserDangerZoneProps) => (
  <Card variant="danger" title="위험 영역">
    {!isDeleted ? (
      <div className={styles.row}>
        <div className={styles.rowLabel}>
          <span className={styles.rowLabelTitle}>사용자 탈퇴 처리</span>
          <span className={styles.rowLabelDesc}>
            {isSelf ? '본인 계정은 탈퇴 처리할 수 없습니다.' : '계정을 탈퇴 처리하고 refresh token을 삭제합니다.'}
          </span>
        </div>
        <Button type="button" variant="outlineSecondary" size="sm" disabled={isSelf} onClick={onDelete}>
          탈퇴 처리
        </Button>
      </div>
    ) : (
      <div className={styles.row}>
        <div className={styles.rowLabel}>
          <span className={styles.rowLabelTitle}>사용자 복구</span>
          <span className={styles.rowLabelDesc}>탈퇴 처리된 계정을 다시 활성화합니다.</span>
        </div>
        <Button type="button" variant="primary" size="sm" onClick={onRestore}>
          복구
        </Button>
      </div>
    )}
  </Card>
);
