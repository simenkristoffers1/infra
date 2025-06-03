import { BaseService } from '@/services/base-service';
import { logger } from '@/utils/logger';

import {
  GetGroupByIdResponse,
  GetOperatorByIdResponse,
  SendMessageRequest,
  SendMessageResponse,
  StartConversationRequest,
  StartConversationResponse,
} from './liveleader-service.dto';

export class LiveleaderService extends BaseService {
  constructor(baseUrl?: string) {
    super(baseUrl);
  }

  async startConversation(payload: StartConversationRequest): Promise<StartConversationResponse> {
    logger.info('Starting LiveLeader conversation', {
      teamId: payload.teamId,
      messageCount: payload.messages.length,
    });

    try {
      const response = await this.post<StartConversationResponse>(
        '/api/v1/liveleader/conversations',
        payload
      );

      logger.info('LiveLeader conversation started successfully', {
        conversationId: response.id,
      });

      return response;
    } catch (error) {
      logger.error(
        'Failed to start LiveLeader conversation',
        {
          teamId: payload.teamId,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        error instanceof Error ? error : undefined
      );
      throw error;
    }
  }

  async sendMessage(payload: SendMessageRequest): Promise<SendMessageResponse> {
    const { conversationId, message } = payload;

    logger.info('Sending message to LiveLeader', {
      conversationId,
      messageRole: message.role,
    });

    try {
      const response = await this.post<SendMessageResponse>(
        `/api/v1/liveleader/conversations/${conversationId}/messages`,
        payload
      );

      logger.info('Message sent successfully to LiveLeader', {
        conversationId,
        messageId: response.id,
      });

      return response;
    } catch (error) {
      logger.error(
        'Failed to send message to LiveLeader',
        {
          conversationId,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        error instanceof Error ? error : undefined
      );
      throw error;
    }
  }

  async getGroupById(teamId: string): Promise<GetGroupByIdResponse> {
    logger.info('Fetching group information from LiveLeader', { teamId });

    try {
      const response = await this.get<GetGroupByIdResponse>(`/api/v1/liveleader/groups/${teamId}`);

      logger.info('Group information fetched successfully', {
        teamId,
        groupName: response.name,
        available: response.available,
      });

      return response;
    } catch (error) {
      logger.error(
        'Failed to fetch group information',
        {
          teamId,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        error instanceof Error ? error : undefined
      );
      throw error;
    }
  }

  async getOperatorById(operatorId: string): Promise<GetOperatorByIdResponse> {
    logger.info('Fetching operator information from LiveLeader', { operatorId });
    try {
      const response = await this.get<GetOperatorByIdResponse>(
        `/api/v1/liveleader/operators/${operatorId}`
      );

      logger.info('Operator information fetched successfully', {
        operatorId,
        operatorName: response.name,
        operatorEmail: response.email,
        operatorPicture: response.picture,
      });

      return response;
    } catch (error) {
      logger.error(
        'Failed to fetch operator information',
        {
          operatorId,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        error instanceof Error ? error : undefined
      );
      throw error;
    }
  }
}
