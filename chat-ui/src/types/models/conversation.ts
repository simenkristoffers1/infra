import { ChatMessage } from './chat-message';

export type Conversation = {
  id: string | null;
  messages: Record<string, ChatMessage>;
};
