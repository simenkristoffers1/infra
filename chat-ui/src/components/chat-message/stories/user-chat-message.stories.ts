import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { v4 as uuidv4 } from 'uuid';
const meta: Meta = {
  title: 'Components/ChatMessage/User',
  component: 'gaia-chat-message',
  argTypes: {
    status: {
      control: 'select',
      options: [
        'completed',
        'pending',
        'failed',
        'cancelled',
        'waitingForApproval',
        'approved',
        'declined',
      ],
      description: 'The status of the message',
    },
    content: {
      control: 'text',
      description: 'The content of the message',
    },
  },
  args: {
    content: 'Hello, world!',
    status: 'completed',
  },
  render: (args) => html`
    <gaia-chat-message
      .data=${{
        id: uuidv4(),
        role: 'user',
        content: args.content,
        status: args.status,
      }}
    ></gaia-chat-message>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
};
