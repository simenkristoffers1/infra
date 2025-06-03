export const API_CONFIG = {
  PING_INTERVAL: 60 * 1000, // 60 seconds
  REQUEST_TIMEOUT: 30 * 1000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

export const WEBSOCKET_EVENTS = {
  PING: 'ping',
  CLOSE: 'close',
  TEXT: 'text',
  FILE: 'file',
  TRANSFER: 'transfer',
  TYPING: 'typing',
  SEEN: 'seen',
} as const;

export const MESSAGE_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  OPERATOR: 'operator',
  VISITOR: 'visitor',
  SYSTEM: 'system',
  TOOL: 'tool',
} as const;

export const MESSAGE_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  WAITING_FOR_APPROVAL: 'waitingForApproval',
  APPROVED: 'approved',
  DECLINED: 'declined',
  TYPING: 'typing',
  INFO: 'info',
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
} as const;

export const SERVER_SENT_EVENTS = {
  UPDATE: 'update',
  MESSAGE: 'message',
  ERROR: 'error',
  CLOSE: 'close',
} as const;

export const DEFAULT_VALUES = {
  LOADING_TEXT: 'Thinking...',
  OPERATOR_NAME: 'Support Agent',
  VISITOR_NAME: 'John Doe',
  VISITOR_EMAIL: 'john@example.com',
  START_URL: 'https://visma.com',
} as const;
