import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { v4 as uuidv4 } from 'uuid';

const meta: Meta = {
  title: 'Patterns/Support Chat',
  argTypes: {
    width: {
      control: 'number',
    },
  },
  args: {
    width: 400,
  },
};

export default meta;

type Story = StoryObj;

export const ConnectSupport: Story = {
  render: (args) => html`
    <div style="width: ${args.width}px;">
      <gaia-card-content>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'user',
            status: 'completed',
            content: 'Let me talk to a human',
          }}
        ></gaia-chat-message>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'assistant',
            status: 'completed',
            content: 'I will connect you to a support agent',
          }}
        ></gaia-chat-message>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'system',
            status: 'info',
            content: 'You have been connected to a support agent',
          }}
        ></gaia-chat-message>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'operator',
            operatorName: 'John Doe',
            status: 'completed',
            content: 'Hello, how can I help you?',
          }}
        ></gaia-chat-message>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'visitor',
            status: 'completed',
            content: 'Hello',
            seenTimestamp: new Date().toISOString(),
          }}
        ></gaia-chat-message>
      </gaia-card-content>
    </div>
  `,
};

export const OperatorTyping: Story = {
  render: (args) => html`
    <div style="width: ${args.width}px;">
      <gaia-card-content>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'operator',
            operatorName: 'John Doe',
            status: 'completed',
            content: 'Hello, how can I help you?',
          }}
        ></gaia-chat-message>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'visitor',
            status: 'completed',
            content: 'I have trouble with my account',
            seenTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
          }}
        ></gaia-chat-message>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'operator',
            status: 'typing',
            operatorName: 'John Doe',
          }}
        ></gaia-chat-message>
      </gaia-card-content>
    </div>
  `,
};

export const MessageDelivered: Story = {
  render: (args) => html`
    <div style="width: ${args.width}px;">
      <gaia-card-content>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'operator',
            status: 'completed',
            operatorName: 'John Doe',
            content: 'Hello, how can I help you?',
          }}
        ></gaia-chat-message>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'visitor',
            status: 'completed',
            content: 'Hello',
          }}
        ></gaia-chat-message>
      </gaia-card-content>
    </div>
  `,
};
