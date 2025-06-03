import { ReactiveController } from 'lit';
import { v4 as uuidv4 } from 'uuid';

import {
  DEFAULT_VALUES,
  MESSAGE_ROLES,
  MESSAGE_STATUS,
  WEBSOCKET_EVENTS,
} from '@/config/constants';
import { LiveleaderService } from '@/services/liveleader-service';
import {
  GetOperatorByIdResponse,
  LiveLeaderMessage,
  SendMessageResponse,
  WSMessage,
  WSSeenMessage,
  WSTextMessage,
  WSTypingMessage,
} from '@/services/liveleader-service.dto';
import { WebSocketManager } from '@/services/websocket-manager';
import {
  ChatMessage,
  OperatorChatMessage,
  SystemChatMessage,
  VisitorChatMessage,
} from '@/types/models/chat-message';
import { Conversation } from '@/types/models/conversation';
import { logger } from '@/utils/logger';

import { ChatControllerHost } from '../types/interfaces/chat-controller-host';

export interface SupportControllerConfig {
  visitor?: {
    name?: string;
    email?: string;
  };
}

export class SupportController implements ReactiveController {
  private _host: ChatControllerHost;
  private _liveleaderService: LiveleaderService;
  private _websocketManager: WebSocketManager | null = null;
  private _conversationId: string | null = null;
  private _config: SupportControllerConfig;
  private _operatorCache: Map<string, GetOperatorByIdResponse> = new Map();

  public isConnected = false;

  constructor(host: ChatControllerHost, config?: SupportControllerConfig) {
    (this._host = host).addController(this);
    this._config = config || {};
    this._liveleaderService = new LiveleaderService();
  }

  hostConnected() {
    this._liveleaderService.setBaseUrl(this._host.baseUrl);
    logger.debug('Support controller host connected');
  }

  hostDisconnected() {
    logger.debug('Support controller host disconnected');
    this.disconnectFromSupport();
  }

  updateConfig(config: Partial<SupportControllerConfig>): void {
    this._config = { ...this._config, ...config };
  }

  async connectToSupport(conversation: Conversation, teamId: string): Promise<void> {
    try {
      logger.info('Connecting to support', { teamId });

      if (!teamId) {
        throw new Error('Team ID is required');
      }

      if (!Object.keys(conversation.messages).length) {
        throw new Error('Conversation is empty');
      }

      const response = await this._liveleaderService.startConversation({
        teamId,
        startUrl: DEFAULT_VALUES.START_URL,
        messages: this.mapConversationToLiveLeaderMessages(conversation),
        visitor: {
          name: this._config.visitor?.name || DEFAULT_VALUES.VISITOR_NAME,
          email: this._config.visitor?.email || DEFAULT_VALUES.VISITOR_EMAIL,
        },
        routeToPartner: undefined,
      });

      this._conversationId = response.id;
      await this.establishWebSocketConnection(response.webSocketUrl);

      this.addMessage(
        this.createSystemMessage('You have been connected to support', MESSAGE_STATUS.INFO)
      );

      logger.info('Successfully connected to support', { conversationId: this._conversationId });
    } catch (error) {
      const errorMessage = 'Failed to connect to support';
      logger.error(
        errorMessage,
        {
          teamId,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        error instanceof Error ? error : undefined
      );

      this.addMessage(this.createSystemMessage(errorMessage, MESSAGE_STATUS.ERROR));
      throw error;
    }
  }

  private async establishWebSocketConnection(webSocketUrl: string): Promise<void> {
    this._websocketManager = new WebSocketManager({ url: webSocketUrl });

    this._websocketManager.onConnection({
      onOpen: () => {
        this.isConnected = true;
        logger.info('WebSocket connection established for support');
      },
      onClose: (reason) => {
        this.isConnected = false;
        const message = reason || 'You have been disconnected from support';
        this.addMessage(this.createSystemMessage(message, MESSAGE_STATUS.INFO));
        logger.info('WebSocket connection closed for support', { reason });
      },
      onError: (error) => {
        logger.error('WebSocket error in support', { error: error.type });
        this.addMessage(
          this.createSystemMessage(
            'An error occurred with the support connection',
            MESSAGE_STATUS.ERROR
          )
        );
      },
    });

    this._websocketManager.onMessage<WSMessage>(WEBSOCKET_EVENTS.CLOSE, () => {
      this.disconnectFromSupport('The operator has closed the conversation');
    });

    this._websocketManager.onMessage<WSTextMessage>(WEBSOCKET_EVENTS.TEXT, async (message) => {
      this.addMessage(await this.createOperatorMessage(message));
    });

    this._websocketManager.onMessage<WSTypingMessage>(WEBSOCKET_EVENTS.TYPING, (message) => {
      this.handleTypingMessage(message);
    });

    this._websocketManager.onMessage<WSSeenMessage>(WEBSOCKET_EVENTS.SEEN, (message) => {
      this.handleSeenMessage(message);
    });

    await this._websocketManager.connect();
  }

  async sendMessage(message: string): Promise<void> {
    if (!this._conversationId) {
      throw new Error('No active support conversation');
    }

    if (!this.isConnected) {
      throw new Error('Not connected to support');
    }

    try {
      logger.info('Sending message to support', { conversationId: this._conversationId });

      const response = await this._liveleaderService.sendMessage({
        message: {
          role: MESSAGE_ROLES.VISITOR,
          text: message,
          time: new Date().toISOString(),
        },
        conversationId: this._conversationId,
      });

      this.addMessage(this.createVisitorMessage(response));

      logger.info('Message sent to support successfully', {
        conversationId: this._conversationId,
        messageId: response.id,
      });
    } catch (error) {
      const errorMessage = 'Failed to send message to support';
      logger.error(
        errorMessage,
        {
          conversationId: this._conversationId,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        error instanceof Error ? error : undefined
      );

      this.addMessage(this.createSystemMessage(errorMessage, MESSAGE_STATUS.ERROR));
      throw error;
    }
  }

  disconnectFromSupport(reason?: string): void {
    logger.info('Disconnecting from support', { reason });

    this._conversationId = null;
    this.isConnected = false;

    if (this._websocketManager) {
      this._websocketManager.disconnect(reason);
      this._websocketManager = null;
    }

    this._operatorCache.clear();
  }

  private async getOperatorInfo(operatorId: string): Promise<GetOperatorByIdResponse> {
    if (this._operatorCache.has(operatorId)) {
      logger.debug('Using cached operator information', { operatorId });
      return this._operatorCache.get(operatorId)!;
    }

    try {
      logger.info('Fetching operator information', { operatorId });
      const operatorInfo = await this._liveleaderService.getOperatorById(operatorId);

      this._operatorCache.set(operatorId, operatorInfo);

      return operatorInfo;
    } catch (error) {
      logger.error(
        'Failed to fetch operator information',
        {
          operatorId,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        error instanceof Error ? error : undefined
      );

      // TODO: Maybe we should throw an error here?
      return {
        id: operatorId,
        name: DEFAULT_VALUES.OPERATOR_NAME,
        email: '',
        picture: '',
      };
    }
  }

  private async handleTypingMessage(message: WSTypingMessage): Promise<void> {
    try {
      const operatorInfo = await this.getOperatorInfo(message.operatorId);

      if (operatorInfo.id in this._host.conversation.messages) {
        return;
      }

      logger.debug('Operator typing', {
        operatorId: message.operatorId,
        operatorName: operatorInfo.name,
      });

      const typingMessage: OperatorChatMessage = {
        id: message.operatorId,
        role: MESSAGE_ROLES.OPERATOR,
        content: '',
        status: MESSAGE_STATUS.TYPING,
        timestamp: message.time,
        operatorId: message.operatorId,
        operatorName: operatorInfo.name,
        operatorAvatar: operatorInfo.picture,
      };
      this.addMessage(typingMessage);

      // Remove typing indicator after a delay
      setTimeout(() => {
        this.removeTypingMessage(message.operatorId);
      }, 10000);
    } catch (error) {
      logger.error('Error handling typing message', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  private async handleSeenMessage(message: WSSeenMessage): Promise<void> {
    try {
      const operatorInfo = await this.getOperatorInfo(message.operatorId);

      logger.debug('Message seen by operator', {
        operatorId: message.operatorId,
        operatorName: operatorInfo.name,
        seenMessageId: message.seenMessageId,
      });
    } catch (error) {
      logger.error('Error handling seen message', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  private mapConversationToLiveLeaderMessages(conversation: Conversation): LiveLeaderMessage[] {
    const messages: LiveLeaderMessage[] = [];

    for (const message of Object.values(conversation.messages)) {
      if (message.role === MESSAGE_ROLES.USER || message.role === MESSAGE_ROLES.ASSISTANT) {
        messages.push({
          role:
            message.role === MESSAGE_ROLES.USER ? MESSAGE_ROLES.VISITOR : MESSAGE_ROLES.ASSISTANT,
          text: message.content,
          time: message.timestamp,
        });
      }
    }

    return messages;
  }

  private addMessage(message: ChatMessage): void {
    const newMessages = { ...this._host.conversation.messages, [message.id]: message };
    this._host.conversation = {
      ...this._host.conversation,
      messages: newMessages,
    };
    this._host.requestUpdate();
    this._host.scrollToBottom();
  }

  private createVisitorMessage(data: SendMessageResponse): VisitorChatMessage {
    return {
      id: data.id,
      role: MESSAGE_ROLES.VISITOR,
      content: data.text,
      timestamp: data.time,
      status: MESSAGE_STATUS.COMPLETED,
    };
  }

  private removeTypingMessage(messageId: string): void {
    const newMessages = { ...this._host.conversation.messages };
    delete newMessages[messageId];
    this._host.conversation = {
      ...this._host.conversation,
      messages: newMessages,
    };
    this._host.requestUpdate();
  }

  private async createOperatorMessage(data: WSTextMessage): Promise<OperatorChatMessage> {
    const operatorInfo = await this.getOperatorInfo(data.operatorId);

    if (data.operatorId in this._host.conversation.messages) {
      this.removeTypingMessage(data.operatorId);
    }

    return {
      id: data.id,
      role: MESSAGE_ROLES.OPERATOR,
      content: data.text,
      timestamp: data.time,
      status: MESSAGE_STATUS.COMPLETED,
      operatorId: data.operatorId,
      operatorName: operatorInfo.name,
      operatorAvatar: operatorInfo.picture,
    };
  }

  private createSystemMessage(
    message: string,
    status: SystemChatMessage['status']
  ): SystemChatMessage {
    return {
      id: uuidv4(),
      role: MESSAGE_ROLES.SYSTEM,
      content: message,
      status,
      timestamp: new Date().toISOString(),
    };
  }
}
