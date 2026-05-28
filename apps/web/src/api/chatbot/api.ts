import { client } from '../client';
import { toApiError } from '../errors';
import { type ChatRequest, type ChatResponse } from './types';

// 챗봇 전용 타임아웃 설정
const CHATBOT_TIMEOUT_MS = 30_000;

export const askChatbot = async (data: ChatRequest): Promise<ChatResponse> => {
  try {
    return await client.post('api/v1/chatbot/chat', { json: data, timeout: CHATBOT_TIMEOUT_MS }).json<ChatResponse>();
  } catch (e) {
    throw toApiError(e);
  }
};
