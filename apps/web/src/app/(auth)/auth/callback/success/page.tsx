'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { refresh } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';

const SocialLoginSuccessPage = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    refresh()
      .then((user) => {
        setUser(user);
        router.replace('/home');
      })
      .catch(() => {
        router.replace('/login');
      });
  }, [router, setUser]);

  return null;
};

export default SocialLoginSuccessPage;
