'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { type AuthUser } from '@/types/auth';

const UserContext = createContext<AuthUser | null>(null);

interface Props {
  user: AuthUser;
  children: ReactNode;
}

export const UserProvider = ({ user, children }: Props) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

export const useUser = (): AuthUser => {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error('useUser는 UserProvider 안에서만 사용할 수 있습니다.');
  }
  return user;
};
