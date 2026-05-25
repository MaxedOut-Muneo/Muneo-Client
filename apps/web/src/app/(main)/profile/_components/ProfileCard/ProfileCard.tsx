'use client';

import { Modal } from '@muneo/design-system';
import { useState } from 'react';
import { useWithdraw } from '../../_hooks/useWithdraw';
import { type ProfileUser } from '../../_types/profile.types';
import { ProfileForm } from '../ProfileForm/ProfileForm';
import { ProfileHeader } from '../ProfileHeader/ProfileHeader';
import * as styles from './ProfileCard.css';

interface ProfileCardProps {
  user: ProfileUser;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const { withdraw, isLoading, errorMessage } = useWithdraw();

  const handleCancel = () => {
    if (isLoading) {
      return;
    }
    setIsWithdrawModalOpen(false);
  };

  return (
    <section className={styles.card}>
      <div className={styles.inner}>
        <ProfileHeader initial={user.initial} name={user.name} subtitle={user.role} />
        <ProfileForm
          user={user}
          leftAction={
            <button type="button" className={styles.withdrawButton} onClick={() => setIsWithdrawModalOpen(true)}>
              회원 탈퇴
            </button>
          }
        />
      </div>
      <Modal
        isOpen={isWithdrawModalOpen}
        title="회원탈퇴 하시겠습니까?"
        subtitle={errorMessage ?? undefined}
        confirmLabel={isLoading ? '처리 중...' : '탈퇴'}
        onCancel={handleCancel}
        onConfirm={withdraw}
      />
    </section>
  );
};
