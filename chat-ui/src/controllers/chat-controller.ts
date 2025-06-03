import { ReactiveController } from 'lit';
import { v4 as uuidv4 } from 'uuid';

import { MESSAGE_ROLES, MESSAGE_STATUS, SERVER_SENT_EVENTS } from '@/config/constants';
import { ChatService } from '@/services/chat-service';
import { ActionApprovalEvent } from '@/types/events';
import { ChatMessage, SystemChatMessage, UserChatMessage } from '@/types/models/chat-message';
import { SSEvent, SSUpdateEvent, UpdateOperation } from '@/types/server-sent-events';
import { logger } from '@/utils/logger';
import { updateObjectAtPathImmutable } from '@/utils/object';

import { ChatControllerHost } from '../types/interfaces/chat-controller-host';

export class ChatController implements ReactiveController {
  host: ChatControllerHost;
  private currentPath: string = '';
  private currentOperation: UpdateOperation = 'set';
  private readonly chatService: ChatService;

  constructor(host: ChatControllerHost) {
    (this.host = host).addController(this);
    this.chatService = new ChatService();
  }

  hostConnected() {
    this.chatService.setBaseUrl(this.host.baseUrl);
    logger.debug('Chat controller host connected', { baseUrl: this.host.baseUrl });
  }

  hostDisconnected() {
    logger.debug('Chat controller host disconnected');
    this.chatService.abort();
  }

  async sendMessage(message: string): Promise<void> {
    if (!this.host.profileId) {
      throw new Error('Profile ID is required');
    }

    const userMessage = this.createUserMessage(message);
    this.addMessage(userMessage);

    this.host.loading = true;

    try {
      logger.info('Sending message to AI assistant', {
        profileId: this.host.profileId,
        conversationId: this.host.conversation.id,
        messageId: userMessage.id,
      });

      for await (const event of this.chatService.streamMessages({
        assistantId: this.host.profileId,
        conversationId: this.host.conversation.id,
        messageId: userMessage.id,
        content: message,
      })) {
        this.handleStreamEvent(event);
      }

      logger.info('Message sent to AI assistant successfully', {
        profileId: this.host.profileId,
        messageId: userMessage.id,
      });
    } catch (error) {
      const errorMessage = 'An error occurred while sending the message';
      logger.error(
        errorMessage,
        {
          profileId: this.host.profileId,
          messageId: userMessage.id,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        error instanceof Error ? error : undefined
      );

      this.addMessage(this.createSystemMessage(errorMessage, MESSAGE_STATUS.ERROR));
    } finally {
      if (this.host.loading) {
        this.host.loading = false;
        this.host.requestUpdate();
      }
      this.host.scrollToBottom();
    }
  }

  private handleStreamEvent(event: SSEvent): void {
    switch (event.type) {
      case SERVER_SENT_EVENTS.UPDATE:
        if (this.host.loading && this.isLoadingComplete()) {
          this.host.loading = false;
          this.host.requestUpdate();
          this.updateConversation(event);
        } else {
          this.updateConversation(event);
          this.requestUpdate();
        }
        break;

      case SERVER_SENT_EVENTS.MESSAGE:
        this.addMessage(this.createSystemMessage(event.data.message, MESSAGE_STATUS.INFO));
        break;

      case SERVER_SENT_EVENTS.ERROR:
        this.addMessage(this.createSystemMessage(event.data.message, MESSAGE_STATUS.ERROR));
        logger.error('Error from AI assistant', { error: event.data.message });
        break;

      case SERVER_SENT_EVENTS.CLOSE:
        logger.info('AI assistant stream closed');
        this.requestUpdate();
        break;

      default:
        logger.warn('Unknown event type from AI assistant', {
          type: (event as unknown as SSEvent).type,
        });
    }
  }

  async sendActionApproval(event: ActionApprovalEvent): Promise<void> {
    if (!this.host.conversation.id) {
      throw new Error('Conversation ID is required');
    }

    try {
      logger.info('Submitting action approval', {
        conversationId: this.host.conversation.id,
        messageId: event.detail.messageId,
        isApproved: event.detail.isApproved,
      });

      await this.chatService.submitActionApproval({
        conversationId: this.host.conversation.id,
        messageId: event.detail.messageId,
        isApproved: event.detail.isApproved,
      });

      logger.info('Action approval submitted successfully', {
        messageId: event.detail.messageId,
        isApproved: event.detail.isApproved,
      });
    } catch (error) {
      const errorMessage = 'Failed to submit action approval';
      logger.error(
        errorMessage,
        {
          messageId: event.detail.messageId,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        error instanceof Error ? error : undefined
      );

      this.addMessage(this.createSystemMessage(errorMessage, MESSAGE_STATUS.ERROR));
      throw error;
    }
  }

  private requestUpdate(): void {
    if (!this.host.loading) {
      this.host.requestUpdate();
    }
  }

  private isLoadingComplete(): boolean {
    const messages = Object.values(this.host.conversation.messages);
    const lastMessage = messages[messages.length - 1];
    return (
      lastMessage && lastMessage.role === MESSAGE_ROLES.ASSISTANT && lastMessage.content.length > 0
    );
  }

  private updateConversation(event: SSUpdateEvent): void {
    const { p, o, v: value } = event.data;
    this.currentPath = p ?? this.currentPath;
    this.currentOperation = o ?? this.currentOperation;

    try {
      this.host.conversation = updateObjectAtPathImmutable(
        this.host.conversation,
        this.currentPath,
        this.currentOperation,
        value
      );
      this.host.requestUpdate();
    } catch (error) {
      logger.error(
        'Failed to update conversation',
        {
          path: this.currentPath,
          operation: this.currentOperation,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        error instanceof Error ? error : undefined
      );
    }
  }

  private addMessage(message: ChatMessage): void {
    const newMessages = { ...this.host.conversation.messages, [message.id]: message };
    this.host.conversation = {
      ...this.host.conversation,
      messages: newMessages,
    };
    this.host.requestUpdate();
    this.host.scrollToBottom();
  }

  private createUserMessage(message: string): UserChatMessage {
    return {
      id: uuidv4(),
      role: MESSAGE_ROLES.USER,
      content: message,
      status: MESSAGE_STATUS.PENDING,
      timestamp: new Date().toISOString(),
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
