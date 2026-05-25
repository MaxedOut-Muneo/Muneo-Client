import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type User } from '@/api';

interface AuthState {
  admin: User | null;
  setAdmin: (admin: User | null) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      setAdmin: (admin) => set({ admin }),
      clear: () => set({ admin: null }),
    }),
    {
      name: 'muneo-admin-auth',
    }
  )
);
