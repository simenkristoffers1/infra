import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { v4 as uuidv4 } from 'uuid';

const meta: Meta = {
  title: 'Components/ChatMessage/System',
  component: 'gaia-chat-message',
  argTypes: {
    content: {
      control: 'text',
      description: 'The content of the message',
    },
  },
  args: {
    content: 'Hello, world!',
  },
  render: (args) => html`
    <gaia-chat-message
      .data=${{
        id: uuidv4(),
        role: 'system',
        status: 'completed',
        content: args.content,
      }}
    ></gaia-chat-message>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
};
