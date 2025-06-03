export type LiveLeaderMessage = {
  role: 'assistant' | 'visitor';
  text: string;
  time: string;
};

type Visitor = {
  name: string;
  email: string;
  data?: object;
};

export type StartConversationRequest = {
  teamId: string;
  startUrl: string;
  messages: LiveLeaderMessage[];
  visitor: Visitor;
  routeToPartner: string | undefined;
};

export type StartConversationResponse = {
  id: string;
  webSocketUrl: string;
};

export type SendMessageRequest = {
  conversationId: string;
  message: LiveLeaderMessage;
};

export type SendMessageResponse = {
  text: string;
  time: string;
  id: string;
  role: 'visitor';
  type: 'text';
};

export type GetGroupByIdResponse = {
  id: string;
  name: string;
  available: boolean;
  officeHourIntervals: {
    day: number;
    startTime: string;
    endTime: string;
  }[];
  members: {
    id: string;
    name: string;
    email: string;
  }[];
  operatorIds: string[];
};

export type GetOperatorByIdResponse = {
  id: string;
  name: string;
  email: string;
  picture: string | null;
};

export type WSTextMessage = {
  id: string;
  operatorId: string;
  role: 'operator';
  text: string;
  time: string;
  type: 'text';
};

type WSFileMessage = {
  type: 'file';
  time: string;
  id: string;
  role: string;
  fileName: string;
  fileUrl: string;
};

type WSTransferOperatorMessage = {
  type: 'transfer';
  time: string;
  operatorId: string;
  targetName: string;
};

type WSTransferPartnerMessage = {
  type: 'transfer';
  time: string;
  targetName: string;
};

export type WSTypingMessage = {
  conversationId: string;
  id: string;
  operatorId: string;
  role: 'operator';
  time: string;
  type: 'typing';
};

type WSCloseMessage = {
  id: string;
  operatorId: string;
  role: 'operator';
  time: string;
  type: 'close';
};

export type WSSeenMessage = {
  conversationId: string;
  id: string;
  operatorId: string;
  role: 'operator';
  seenMessageId: string;
  seenMessageTime: string;
  time: string;
  type: 'seen';
};

export type WSMessage =
  | WSTextMessage
  | WSFileMessage
  | WSCloseMessage
  | WSTransferOperatorMessage
  | WSTransferPartnerMessage
  | WSTypingMessage
  | WSSeenMessage;
