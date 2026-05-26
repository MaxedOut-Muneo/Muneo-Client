'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { type AuthUser } from '@/types/auth';

interface AuthStoreInitializerProps {
  user: AuthUser;
}

export const AuthStoreInitializer = ({ user }: AuthStoreInitializerProps) => {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
};
