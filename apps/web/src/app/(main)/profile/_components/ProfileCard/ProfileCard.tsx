'use client';

import { Button, KakaoIcon, TextField } from '@muneo/design-system';
import { useState, type ChangeEvent, type ComponentType, type FormEvent, type SVGProps } from 'react';
import * as styles from './ProfileCard.css';

const SOCIAL_PROVIDER_CONFIG = {
  kakao: { label: '카카오 로그인', Icon: KakaoIcon },
} satisfies Record<string, { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }>;

type SocialProvider = keyof typeof SOCIAL_PROVIDER_CONFIG;

interface ProfileUserBase {
  initial: string;
  name: string;
  role: string;
}

export type ProfileUser =
  | (ProfileUserBase & { signupType: 'self' })
  | (ProfileUserBase & { signupType: 'social'; provider: SocialProvider });

interface FieldConfig {
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'password';
}

const FIELD_CONFIG = {
  email: { label: '이메일', placeholder: 'name@email.com', type: 'email' },
  name: { label: '이름', placeholder: '김민수', type: 'text' },
  birth: { label: '생년월일', placeholder: 'YYYY-MM-DD', type: 'text' },
  phone: { label: '연락처', placeholder: '010-0000-0000', type: 'text' },
  password: { label: '새 비밀번호', placeholder: '', type: 'password' },
  passwordConfirm: { label: '비밀번호 확인', placeholder: '', type: 'password' },
} satisfies Record<string, FieldConfig>;

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

interface ProfileCardProps {
  user: ProfileUser;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const [values, setValues] = useState<ProfileFormValues>(INITIAL_VALUES);

  const handleChange = (id: FieldId) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [id]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const visibleFields = user.signupType === 'self' ? SELF_FIELDS : SOCIAL_FIELDS;

  return (
    <section className={styles.card}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.avatar} aria-hidden>
            {user.initial}
          </div>
          <div className={styles.info}>
            <p className={styles.name}>{user.name}</p>
            <p className={styles.role}>{user.role}</p>
          </div>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fields}>
            {user.signupType === 'social' && <SocialEmailField provider={user.provider} />}
            {visibleFields.map((id) => {
              const config = FIELD_CONFIG[id];
              return (
                <TextField
                  key={id}
                  id={id}
                  label={config.label}
                  placeholder={config.placeholder}
                  type={config.type}
                  value={values[id]}
                  onChange={handleChange(id)}
                />
              );
            })}
          </div>
          <Button type="submit" variant="gradient" className={styles.submitButton}>
            저장하기
          </Button>
        </form>
      </div>
    </section>
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
