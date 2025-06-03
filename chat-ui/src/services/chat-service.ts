import { SERVER_SENT_EVENTS } from '@/config/constants';
import { BaseService } from '@/services/base-service';
import { SendMessageRequest, SubmitActionApprovalRequest } from '@/services/chat-service.dto';
import { SSEvent, SSEventType } from '@/types/server-sent-events';
import { logger } from '@/utils/logger';

export class ChatService extends BaseService {
  private abortController: AbortController | null = null;

  constructor(baseUrl?: string) {
    super(baseUrl);
  }

  async *streamMessages(payload: SendMessageRequest): AsyncGenerator<SSEvent, void, unknown> {
    this.abort();
    this.abortController = new AbortController();

    try {
      logger.info('Starting message stream', { conversationId: payload.conversationId });

      const response = await fetch(`${this.baseUrl}/api/v1/conversations/stream`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
        signal: this.abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('Response body is empty');
      }

      yield* this.processStreamResponse(response.body);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(
        'Error in message stream',
        { error: errorMessage },
        error instanceof Error ? error : undefined
      );

      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        throw error;
      }
    } finally {
      this.abort();
    }
  }

  private async *processStreamResponse(
    stream: ReadableStream<Uint8Array>
  ): AsyncGenerator<SSEvent, void, unknown> {
    const decoder = new TextDecoder();
    const reader = stream.getReader();
    let jsonBuffer = '';
    let done = false;

    try {
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (!value) continue;

        const chunk = decoder.decode(value, { stream: true });
        jsonBuffer += chunk;
        const chunks = jsonBuffer.split('\n\n');
        jsonBuffer = chunks.pop() || '';

        for (const chunk of chunks) {
          const event = this.parseSSEChunk(chunk);
          if (event) {
            yield event;
          }
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(
        'Error processing stream response',
        { error: errorMessage },
        error instanceof Error ? error : undefined
      );
      throw error;
    } finally {
      reader.releaseLock();
    }
  }

  private parseSSEChunk(chunk: string): SSEvent | null {
    const match = /event: (.*)\ndata: (.*)/gm.exec(chunk);

    if (!match) {
      logger.warn('Malformed SSE chunk', { chunk });
      return null;
    }

    const [eventType, jsonString] = match.slice(1) as [SSEventType, string];

    if (!this.isValidEventType(eventType)) {
      logger.warn('Unknown SSE event type', { eventType });
      return null;
    }

    try {
      return {
        type: eventType,
        data: JSON.parse(jsonString),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(
        'Failed to parse SSE data',
        { jsonString, error: errorMessage },
        error instanceof Error ? error : undefined
      );
      return null;
    }
  }

  private isValidEventType(eventType: string): eventType is SSEventType {
    return Object.values(SERVER_SENT_EVENTS).includes(eventType as SSEventType);
  }

  async submitActionApproval(payload: SubmitActionApprovalRequest): Promise<void> {
    const { conversationId, messageId, isApproved } = payload;

    logger.info('Submitting action approval', { conversationId, messageId, isApproved });

    await this.post(`/api/v1/conversations/${conversationId}/messages/${messageId}/approve`, {
      approved: isApproved,
    });
  }

  abort(): void {
    if (this.abortController && !this.abortController.signal.aborted) {
      logger.debug('Aborting chat service request');
      this.abortController.abort();
    }
    this.abortController = null;
  }
}
