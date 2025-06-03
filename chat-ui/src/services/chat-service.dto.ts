export type SendMessageRequest = {
  assistantId: string;
  conversationId: string | null;
  messageId: string;
  content: string;
};

export type SubmitActionApprovalRequest = {
  conversationId: string;
  messageId: string;
  isApproved: boolean;
};
