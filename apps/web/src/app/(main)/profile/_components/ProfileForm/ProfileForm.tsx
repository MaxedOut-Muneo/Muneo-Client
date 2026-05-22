'use client';

import { Button, KakaoIcon, TextField } from '@muneo/design-system';
import { type ComponentType, type ReactNode, type SVGProps } from 'react';
import { useProfileForm } from '../../_hooks/useProfileForm';
import { type ProfileUser, type SocialProvider } from '../../_types/profile.types';
import * as styles from './ProfileForm.css';

const SOCIAL_PROVIDER_CONFIG = {
  kakao: { label: '카카오 로그인', Icon: KakaoIcon },
} as const satisfies Record<SocialProvider, { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }>;

const FIELD_CONFIG = {
  name: { label: '이름', placeholder: '김민수', type: 'text' },
  birth: { label: '생년월일', placeholder: 'YYYY-MM-DD', type: 'text' },
  phone: { label: '연락처', placeholder: '010-0000-0000', type: 'text' },
  password: { label: '새 비밀번호', placeholder: '', type: 'password' },
  passwordConfirm: { label: '비밀번호 확인', placeholder: '', type: 'password' },
} as const satisfies Record<string, { label: string; placeholder: string; type: 'text' | 'email' | 'password' }>;

type FieldId = keyof typeof FIELD_CONFIG;

const SELF_FIELDS = ['name', 'birth', 'phone', 'password', 'passwordConfirm'] as const satisfies readonly FieldId[];
const SOCIAL_FIELDS = ['name', 'birth', 'phone'] as const satisfies readonly FieldId[];

interface ProfileFormProps {
  user: ProfileUser;
  leftAction?: ReactNode;
}

export const ProfileForm = ({ user, leftAction }: ProfileFormProps) => {
  const { register, errors, isSubmitting, onSubmit } = useProfileForm(user);
  const visibleFields = user.signupType === 'self' ? SELF_FIELDS : SOCIAL_FIELDS;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.fields}>
        {user.signupType === 'social' ? (
          <SocialEmailField provider={user.provider} />
        ) : (
          <TextField id="email" label="이메일" type="email" value={user.email} disabled readOnly />
        )}
        {visibleFields.map((id) => (
          <TextField
            key={id}
            id={id}
            label={FIELD_CONFIG[id].label}
            placeholder={FIELD_CONFIG[id].placeholder}
            type={FIELD_CONFIG[id].type}
            error={errors[id]?.message}
            {...register(id)}
          />
        ))}
      </div>
      {errors.root && <p className={styles.errorMessage}>{errors.root.message}</p>}
      <div className={styles.actionsRow}>
        <div>{leftAction}</div>
        <Button type="submit" variant="gradient" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : '저장하기'}
        </Button>
      </div>
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
