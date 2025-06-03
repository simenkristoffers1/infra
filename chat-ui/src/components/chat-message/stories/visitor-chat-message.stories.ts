import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { v4 as uuidv4 } from 'uuid';
const meta: Meta = {
  title: 'Components/ChatMessage/Visitor',
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
    seenTimestamp: {
      control: 'date',
      description: 'The timestamp of the message',
    },
  },
  args: {
    content: 'Hello, world!',
    status: 'completed',
    seenTimestamp: undefined,
  },
  render: (args) => html`
    <gaia-chat-message
      .data=${{
        id: uuidv4(),
        role: 'visitor',
        content: args.content,
        status: args.status,
        seenTimestamp: args.seenTimestamp,
      }}
    ></gaia-chat-message>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
};
