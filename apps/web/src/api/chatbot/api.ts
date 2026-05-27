import { client } from '../client';
import { toApiError } from '../errors';
import { type ChatRequest, type ChatResponse } from './types';

export const askChatbot = async (data: ChatRequest): Promise<ChatResponse> => {
  try {
    return await client.post('api/v1/chatbot/chat', { json: data }).json<ChatResponse>();
  } catch (e) {
    throw toApiError(e);
  }
};
