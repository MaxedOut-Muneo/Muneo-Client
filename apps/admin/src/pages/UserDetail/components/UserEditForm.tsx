import { Button, TextField } from '@muneo/design-system';
import { type FormEvent } from 'react';
import { type UpdateUserRequest } from '@/api';
import { Card } from '@/components/Card';
import { type FormErrors } from '../hooks/useUserDetail';
import * as styles from '../UserDetail.css';

interface UserEditFormProps {
  form: UpdateUserRequest;
  errors: FormErrors;
  isSubmitting: boolean;
  onChange: (next: UpdateUserRequest) => void;
  onSubmit: () => void;
}

export const UserEditForm = ({ form, errors, isSubmitting, onChange, onSubmit }: UserEditFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Card title="정보 수정">
      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <TextField
            id="email"
            label="이메일"
            value={form.email}
            onChange={(e) => onChange({ ...form, email: e.target.value })}
            error={errors.email}
          />
          <TextField
            id="name"
            label="이름"
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            error={errors.name}
          />
          <TextField
            id="phoneNumber"
            label="연락처"
            placeholder="010-0000-0000"
            value={form.phoneNumber}
            onChange={(e) => onChange({ ...form, phoneNumber: e.target.value })}
            error={errors.phoneNumber}
          />
          <TextField
            id="birthDate"
            label="생년월일"
            type="date"
            value={form.birthDate}
            onChange={(e) => onChange({ ...form, birthDate: e.target.value })}
            error={errors.birthDate}
          />
        </div>
        <div className={styles.formActions}>
          <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
            {isSubmitting ? '저장 중...' : '변경 저장'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
