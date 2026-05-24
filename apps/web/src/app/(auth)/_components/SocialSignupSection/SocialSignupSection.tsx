'use client';

import { useRouter } from 'next/navigation';
import { useSocialSignupForm } from '../../_hooks/useSocialSignupForm';
import { SocialSignupModal } from '../SocialSignupModal';

interface SocialSignupSectionProps {
  ticket: string;
}

export const SocialSignupSection = ({ ticket }: SocialSignupSectionProps) => {
  const router = useRouter();
  const { register, errors, isLoading, onSubmit } = useSocialSignupForm(ticket);

  const handleClose = () => router.push('/');
  const handleLogin = () => router.replace('/login');

  return (
    <SocialSignupModal
      register={register}
      errors={errors}
      isLoading={isLoading}
      onSubmit={onSubmit}
      onClose={handleClose}
      onLogoClick={handleClose}
      onLogin={handleLogin}
    />
  );
};
