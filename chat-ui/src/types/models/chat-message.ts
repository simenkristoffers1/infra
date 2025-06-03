export type ChatMessageMetadata = {
  threadId: string;
  citations: Citation[];
  operatorId?: string;
  operatorName?: string;
  operatorAvatar?: string;
};

type Citation = {
  title: string;
  url: string;
  score: number;
};

type BaseChatMessage = {
  id: string;
  role: string;
  status: string;
  content: string;
  timestamp: string;
};

export type SystemChatMessage = BaseChatMessage & {
  role: 'system';
  status: 'info' | 'error' | 'warning' | 'success';
};

/**
 * AI Chat Messages
 */

type BaseAIChatMessage = BaseChatMessage & {
  status:
    | 'pending'
    | 'completed'
    | 'failed'
    | 'cancelled'
    | 'waitingForApproval'
    | 'approved'
    | 'declined';
};

export type UserChatMessage = BaseAIChatMessage & {
  role: 'user';
};

export type ToolChatMessage = BaseAIChatMessage & {
  role: 'tool';
};

export type AssistantChatMessage = BaseAIChatMessage & {
  role: 'assistant' | 'operator';
  metadata?: {
    citations?: Citation[];
  };
};

export type AIChatMessage = AssistantChatMessage | OperatorChatMessage;

/**
 * Support Chat Messages
 */

type BaseSupportChatMessage = BaseChatMessage & {
  status: 'completed' | 'typing';
};

export type VisitorChatMessage = BaseSupportChatMessage & {
  role: 'visitor';
  seenTimestamp?: string;
};

export type OperatorChatMessage = BaseSupportChatMessage & {
  role: 'operator';
  operatorId: string;
  operatorName: string;
  operatorAvatar: string | null;
};

export type SupportChatMessage = VisitorChatMessage | OperatorChatMessage;

/**
 * Union of all Chat Messages
 */

export type ChatMessage =
  | UserChatMessage
  | ToolChatMessage
  | AssistantChatMessage
  | VisitorChatMessage
  | OperatorChatMessage
  | SystemChatMessage;

export type ChatMessageRole = ChatMessage['role'];
export type ChatMessageStatus = ChatMessage['status'];

export function isAIChatMessage(message: ChatMessage): message is AIChatMessage {
  return message.role === 'assistant' || message.role === 'operator';
}

export function isSupportChatMessage(message: ChatMessage): message is SupportChatMessage {
  return message.role === 'visitor' || message.role === 'operator';
}

export function isUserChatMessage(message: ChatMessage): message is UserChatMessage {
  return message.role === 'user';
}

export function isToolChatMessage(message: ChatMessage): message is ToolChatMessage {
  return message.role === 'tool';
}

export function isAssistantChatMessage(message: ChatMessage): message is AssistantChatMessage {
  return message.role === 'assistant';
}

export function isSystemChatMessage(message: ChatMessage): message is SystemChatMessage {
  return message.role === 'system';
}

export function isVisitorChatMessage(message: ChatMessage): message is VisitorChatMessage {
  return message.role === 'visitor';
}

export function isOperatorChatMessage(message: ChatMessage): message is OperatorChatMessage {
  return message.role === 'operator';
}
