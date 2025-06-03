import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { v4 as uuidv4 } from 'uuid';
const meta: Meta = {
  title: 'Components/ChatMessage/Operator',
  component: 'gaia-chat-message',
  argTypes: {
    status: {
      control: 'select',
      options: ['completed', 'typing'],
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
    operatorName: 'John Doe',
    operatorAvatar: 'https://github.com/shadcn.png',
  },
  render: (args) => html`
    <gaia-chat-message
      .data=${{
        id: uuidv4(),
        role: 'operator',
        content: args.content,
        status: args.status,
        operatorId: uuidv4(),
        operatorName: args.operatorName,
        operatorAvatar: args.operatorAvatar,
      }}
    ></gaia-chat-message>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
};

export const Typing: Story = {
  args: {
    status: 'typing',
  },
};
