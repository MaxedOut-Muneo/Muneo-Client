import { Button, Dropdown } from '@muneo/design-system';
import { USER_ROLES, type UserRole } from '@/api';
import { Card } from '@/components/Card';
import { ROLE_LABEL } from '@/lib/formatters';
import * as styles from '../UserDetail.css';

interface UserRoleSectionProps {
  currentRole: UserRole;
  pendingRole: UserRole | null;
  isSelf: boolean;
  isDeleted: boolean;
  onRoleSelect: (role: UserRole) => void;
  onApply: () => void;
}

export const UserRoleSection = ({
  currentRole,
  pendingRole,
  isSelf,
  isDeleted,
  onRoleSelect,
  onApply,
}: UserRoleSectionProps) => {
  const nextRole: UserRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
  const canApply = !isSelf && !isDeleted && Boolean(pendingRole) && pendingRole !== currentRole;

  return (
    <Card title="권한 변경">
      <div className={styles.row}>
        <div className={styles.rowLabel}>
          <span className={styles.rowLabelTitle}>현재 권한: {ROLE_LABEL[currentRole]}</span>
          <span className={styles.rowLabelDesc}>
            {isSelf
              ? '본인 계정의 권한은 변경할 수 없습니다.'
              : `사용자의 권한을 ${ROLE_LABEL[nextRole]}(으)로 변경합니다.`}
          </span>
        </div>
        <div className={styles.rowControl}>
          <div className={styles.roleDropdownWrap}>
            <Dropdown
              options={USER_ROLES.map((r) => ({ value: r, label: ROLE_LABEL[r] }))}
              value={pendingRole ?? currentRole}
              onChange={onRoleSelect}
              disabled={isSelf || isDeleted}
            />
          </div>
          <Button type="button" variant="outlineSecondary" size="sm" disabled={!canApply} onClick={onApply}>
            적용
          </Button>
        </div>
      </div>
    </Card>
  );
};
