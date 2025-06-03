import { API_CONFIG, WEBSOCKET_EVENTS } from '@/config/constants';
import { logger } from '@/utils/logger';

export interface WebSocketConfig {
  url: string;
  pingInterval?: number;
  reconnectAttempts?: number;
  reconnectDelay?: number;
}

export interface WebSocketMessage {
  type: string;
  data?: unknown;
}

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private config: Required<WebSocketConfig>;
  private pingInterval: NodeJS.Timeout | null = null;
  private pingCounter = 0;
  private reconnectAttempts = 0;
  private isManualClose = false;
  private messageHandlers: Map<string, (data: unknown) => void> = new Map();
  private connectionHandlers: {
    onOpen?: () => void;
    onClose?: (reason?: string) => void;
    onError?: (error: Event) => void;
  } = {};

  constructor(config: WebSocketConfig) {
    this.config = {
      pingInterval: API_CONFIG.PING_INTERVAL,
      reconnectAttempts: API_CONFIG.RETRY_ATTEMPTS,
      reconnectDelay: API_CONFIG.RETRY_DELAY,
      ...config,
    };
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        logger.info('Connecting to WebSocket', { url: this.config.url });

        this.ws = new WebSocket(this.config.url);
        this.isManualClose = false;

        this.ws.onopen = () => {
          logger.info('WebSocket connection established');
          this.reconnectAttempts = 0;
          this.startPingInterval();
          this.connectionHandlers.onOpen?.();
          resolve();
        };

        this.ws.onclose = (event) => {
          this.handleClose(event);
        };

        this.ws.onerror = (error) => {
          logger.error('WebSocket error', { error: error.type });
          this.connectionHandlers.onError?.(error);
          reject(new Error('WebSocket connection failed'));
        };

        this.ws.onmessage = (event) => {
          this.handleMessage(event);
        };
      } catch (error) {
        logger.error(
          'Failed to create WebSocket connection',
          {
            error: error instanceof Error ? error.message : 'Unknown error',
          },
          error instanceof Error ? error : undefined
        );
        reject(error);
      }
    });
  }

  disconnect(reason?: string): void {
    logger.info('Disconnecting WebSocket', { reason });

    this.isManualClose = true;
    this.stopPingInterval();

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close(1000, reason);
    }

    this.ws = null;
  }

  send(message: string | WebSocketMessage): void {
    if (!this.isConnected()) {
      throw new Error('WebSocket is not connected');
    }

    const payload = typeof message === 'string' ? message : JSON.stringify(message);

    logger.debug('Sending WebSocket message', {
      type: typeof message === 'object' ? message.type : 'raw',
      size: payload.length,
    });

    this.ws!.send(payload);
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  onMessage<T = unknown>(type: string, handler: (data: T) => void): void {
    this.messageHandlers.set(type, handler as (data: unknown) => void);
  }

  offMessage(type: string): void {
    this.messageHandlers.delete(type);
  }

  onConnection(handlers: {
    onOpen?: () => void;
    onClose?: (reason?: string) => void;
    onError?: (error: Event) => void;
  }): void {
    this.connectionHandlers = handlers;
  }

  private handleMessage(event: MessageEvent<string>): void {
    try {
      if (event.data.startsWith('ping:')) {
        return;
      }

      const message = JSON.parse(event.data) as WebSocketMessage;
      logger.debug('Received WebSocket message', { type: message.type });

      const handler = this.messageHandlers.get(message.type);
      if (handler) {
        handler(message);
      } else {
        logger.warn('No handler for WebSocket message type', { type: message.type });
      }
    } catch (error) {
      logger.error(
        'Failed to parse WebSocket message',
        {
          data: event.data,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        error instanceof Error ? error : undefined
      );
    }
  }

  private handleClose(event: CloseEvent): void {
    logger.info('WebSocket connection closed', {
      code: event.code,
      reason: event.reason,
      wasClean: event.wasClean,
    });

    this.stopPingInterval();

    const reason = event.reason || (event.wasClean ? 'Normal closure' : 'Connection lost');
    this.connectionHandlers.onClose?.(reason);

    // Attempt reconnection if not manually closed
    if (!this.isManualClose && this.reconnectAttempts < this.config.reconnectAttempts) {
      this.attemptReconnect();
    }
  }

  private attemptReconnect(): void {
    this.reconnectAttempts++;
    const delay = this.config.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    logger.info('Attempting WebSocket reconnection', {
      attempt: this.reconnectAttempts,
      maxAttempts: this.config.reconnectAttempts,
      delay,
    });

    setTimeout(() => {
      this.connect().catch((error) => {
        logger.error(
          'WebSocket reconnection failed',
          {
            attempt: this.reconnectAttempts,
            error: error instanceof Error ? error.message : 'Unknown error',
          },
          error instanceof Error ? error : undefined
        );
      });
    }, delay);
  }

  private startPingInterval(): void {
    this.stopPingInterval();

    this.pingInterval = setInterval(() => {
      if (this.isConnected()) {
        this.send(`${WEBSOCKET_EVENTS.PING}:${this.pingCounter}`);
        this.pingCounter++;
      }
    }, this.config.pingInterval);
  }

  private stopPingInterval(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}
