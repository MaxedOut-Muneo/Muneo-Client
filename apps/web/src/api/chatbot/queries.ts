import { useMutation } from '@tanstack/react-query';
import { askChatbot } from './api';

export const useAskChatbot = () =>
  useMutation({
    mutationFn: askChatbot,
  });
