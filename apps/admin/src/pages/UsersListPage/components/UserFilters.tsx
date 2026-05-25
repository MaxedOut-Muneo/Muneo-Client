import { Button, Dropdown, TextField } from '@muneo/design-system';
import { type FormEvent } from 'react';
import { AUTH_PROVIDERS, USER_ROLES, type AuthProvider, type UserRole } from '@/api';
import { PROVIDER_LABEL, ROLE_LABEL } from '@/lib/formatters';
import { type BooleanFilter, type FilterState } from '../hooks/useUsersFilters';
import * as styles from './UserFilters.css';

interface UserFiltersProps {
  draft: FilterState;
  onChange: (next: FilterState) => void;
  onApply: () => void;
  onReset: () => void;
}

const boolOptions: Array<{ value: BooleanFilter; label: string }> = [
  { value: 'all', label: '전체' },
  { value: 'true', label: '예' },
  { value: 'false', label: '아니오' },
];

const roleOptions: Array<{ value: UserRole | 'all'; label: string }> = [
  { value: 'all', label: '전체' },
  ...USER_ROLES.map((r) => ({ value: r, label: ROLE_LABEL[r] })),
];

const providerOptions: Array<{ value: AuthProvider | 'all'; label: string }> = [
  { value: 'all', label: '전체' },
  ...AUTH_PROVIDERS.map((p) => ({ value: p, label: PROVIDER_LABEL[p] })),
];

export const UserFilters = ({ draft, onChange, onApply, onReset }: UserFiltersProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply();
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <span className={styles.label}>검색어 (이메일·이름·전화번호)</span>
          <TextField
            value={draft.keyword}
            onChange={(e) => onChange({ ...draft, keyword: e.target.value })}
            placeholder="검색어를 입력하세요"
          />
        </div>
        <div className={styles.field}>
          <span className={styles.label}>권한</span>
          <Dropdown
            options={roleOptions}
            value={draft.role}
            onChange={(value) => onChange({ ...draft, role: value })}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.label}>가입 방식</span>
          <Dropdown
            options={providerOptions}
            value={draft.authProvider}
            onChange={(value) => onChange({ ...draft, authProvider: value })}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.label}>탈퇴 여부</span>
          <Dropdown
            options={boolOptions}
            value={draft.deleted}
            onChange={(value) => onChange({ ...draft, deleted: value })}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.label}>이메일 인증</span>
          <Dropdown
            options={boolOptions}
            value={draft.emailVerified}
            onChange={(value) => onChange({ ...draft, emailVerified: value })}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.label}>프로필 완성</span>
          <Dropdown
            options={boolOptions}
            value={draft.profileCompleted}
            onChange={(value) => onChange({ ...draft, profileCompleted: value })}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="outlineSecondary" size="sm" onClick={onReset}>
          초기화
        </Button>
        <Button type="submit" variant="primary" size="sm">
          검색
        </Button>
      </div>
    </form>
  );
};
