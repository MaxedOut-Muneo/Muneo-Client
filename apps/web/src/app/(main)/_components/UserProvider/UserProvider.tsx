'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { type AuthUser } from '@/types/auth';

const UserContext = createContext<AuthUser | null>(null);

interface UserProviderProps {
  user: AuthUser;
  children: ReactNode;
}

export const UserProvider = ({ user, children }: UserProviderProps) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

export const useUser = (): AuthUser => {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error('useUser must be used within UserProvider');
  }
  return user;
};
