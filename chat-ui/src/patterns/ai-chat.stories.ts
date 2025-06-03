import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { v4 as uuidv4 } from 'uuid';

// @ts-expect-error - This is a raw file
import markdownResponse from './ai-markdown-sample.md?raw';

const meta: Meta = {
  title: 'Patterns/AI Chat',
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

export const AssistantResponse: Story = {
  render: (args) => html`
    <div style="width: ${args.width}px;">
      <gaia-card-content>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'user',
            status: 'completed',
            content: 'Hello',
          }}
        ></gaia-chat-message>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'assistant',
            status: 'completed',
            content: 'Hello, how can I help you today?',
          }}
        ></gaia-chat-message>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'user',
            status: 'completed',
            content: 'How can I cancel my subscription?',
          }}
        ></gaia-chat-message>
      </gaia-card-content>
    </div>
  `,
};

export const AssistantActionApproval: Story = {
  render: (args) => html`
    <div style="width: ${args.width}px;">
      <gaia-card-content>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'user',
            status: 'completed',
            content: 'I was sick yesterday',
          }}
        ></gaia-chat-message>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'assistant',
            status: 'waitingForApproval',
            content: 'I will add a sick leave for yesterday, do you want me to go ahead?',
          }}
        ></gaia-chat-message>
      </gaia-card-content>
    </div>
  `,
};

export const AssistantThinking: Story = {
  render: (args) => html`
    <div style="width: ${args.width}px;">
      <gaia-card-content>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'user',
            status: 'completed',
            content: 'I was sick yesterday',
          }}
        ></gaia-chat-message>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'assistant',
            status: 'pending',
            content: '',
          }}
        ></gaia-chat-message>
      </gaia-card-content>
    </div>
  `,
};

export const AssistantMarkdownSample: Story = {
  render: (args) => html`
    <div style="width: ${args.width}px;">
      <gaia-card-content>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'user',
            status: 'completed',
            content: 'Hello',
          }}
        ></gaia-chat-message>
        <gaia-chat-message
          .data=${{
            id: uuidv4(),
            role: 'assistant',
            status: 'completed',
            content: markdownResponse,
          }}
        ></gaia-chat-message>
      </gaia-card-content>
    </div>
  `,
};
