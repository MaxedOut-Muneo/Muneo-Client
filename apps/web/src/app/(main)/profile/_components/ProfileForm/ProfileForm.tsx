'use client';

import { Button, KakaoIcon, TextField } from '@muneo/design-system';
import { useState, type ChangeEvent, type ComponentType, type FormEvent, type SVGProps } from 'react';
import { type ProfileUser, type SocialProvider } from '../../_types/profile.types';
import * as styles from './ProfileForm.css';

const SOCIAL_PROVIDER_CONFIG = {
  kakao: { label: '카카오 로그인', Icon: KakaoIcon },
} as const satisfies Record<SocialProvider, { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }>;

const FIELD_CONFIG = {
  email: { label: '이메일', placeholder: 'name@email.com', type: 'email' },
  name: { label: '이름', placeholder: '김민수', type: 'text' },
  birth: { label: '생년월일', placeholder: 'YYYY-MM-DD', type: 'text' },
  phone: { label: '연락처', placeholder: '010-0000-0000', type: 'text' },
  password: { label: '새 비밀번호', placeholder: '', type: 'password' },
  passwordConfirm: { label: '비밀번호 확인', placeholder: '', type: 'password' },
} as const satisfies Record<string, { label: string; placeholder: string; type: 'text' | 'email' | 'password' }>;

type FieldId = keyof typeof FIELD_CONFIG;

const SELF_FIELDS = [
  'email',
  'name',
  'birth',
  'phone',
  'password',
  'passwordConfirm',
] as const satisfies readonly FieldId[];
const SOCIAL_FIELDS = ['name', 'birth', 'phone'] as const satisfies readonly FieldId[];

type ProfileFormValues = Record<FieldId, string>;

const INITIAL_VALUES: ProfileFormValues = {
  email: '',
  name: '',
  birth: '',
  phone: '',
  password: '',
  passwordConfirm: '',
};

interface ProfileFormProps {
  user: ProfileUser;
}

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const [values, setValues] = useState<ProfileFormValues>(INITIAL_VALUES);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setValues((prev) => ({ ...prev, [id as FieldId]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const visibleFields = user.signupType === 'self' ? SELF_FIELDS : SOCIAL_FIELDS;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        {user.signupType === 'social' && <SocialEmailField provider={user.provider} />}
        {visibleFields.map((id) => (
          <TextField
            key={id}
            id={id}
            label={FIELD_CONFIG[id].label}
            placeholder={FIELD_CONFIG[id].placeholder}
            type={FIELD_CONFIG[id].type}
            value={values[id]}
            onChange={handleChange}
          />
        ))}
      </div>
      <Button type="submit" variant="gradient" className={styles.submitButton}>
        저장하기
      </Button>
    </form>
  );
};

interface SocialEmailFieldProps {
  provider: SocialProvider;
}

const SocialEmailField = ({ provider }: SocialEmailFieldProps) => {
  const { label, Icon } = SOCIAL_PROVIDER_CONFIG[provider];
  return (
    <div className={styles.socialField}>
      <p className={styles.socialFieldLabel}>이메일</p>
      <div className={styles.socialBadge}>
        <Icon className={styles.socialBadgeIcon} />
        <span className={styles.socialBadgeText}>{label}</span>
      </div>
    </div>
  );
};
