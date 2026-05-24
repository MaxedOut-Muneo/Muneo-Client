import { create } from 'zustand';

interface ChatStore {
  isOpen: boolean;
  pendingMessage: string;
  open: (message?: string) => void;
  close: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isOpen: false,
  pendingMessage: '',
  open: (message = '') => set({ isOpen: true, pendingMessage: message }),
  close: () => set({ isOpen: false, pendingMessage: '' }),
}));
