import { ReactiveControllerHost } from '@lit/reactive-element';

import { Conversation } from '@/types/models/conversation';

export interface ChatControllerHost extends ReactiveControllerHost {
  conversation: Conversation;
  profileId: string | null;
  baseUrl: string;
  loading: boolean;
  scrollToBottom: () => void;
}
