export type UpdateOperation = 'set' | 'append';

export type SSUpdateEvent = {
  type: 'update';
  data: {
    p?: string;
    o?: UpdateOperation;
    v: unknown;
  };
};

export type SSErrorEvent = {
  type: 'error';
  data: {
    code: string;
    message: string;
  };
};

export type SSMessageEvent = {
  type: 'message';
  data: {
    message: string;
  };
};

export type SSCloseEvent = {
  type: 'close';
  data: string;
};

export type SSEvent = SSUpdateEvent | SSErrorEvent | SSMessageEvent | SSCloseEvent;
export type SSEventType = SSEvent['type'];
