import { within } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { v4 as uuidv4 } from 'uuid';

import { ChatMessage } from '../../../components/chat-message/chat-message';

const meta: Meta = {
  title: 'Components/ChatMessage/Assistant',
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
        role: 'assistant',
        content: args.content,
        status: args.status,
        metadata: {
          citations: args.metadata?.citations || [],
        },
      }}
    ></gaia-chat-message>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
};

export const WithCitations: Story = {
  args: {
    metadata: {
      citations: [
        {
          title: 'Brukertyper og klientnivåer i OneStop Reporting',
          url: 'https://kundeportal.vismasoftware.no/s/article/Brukertyper-og-leiernivåer-i-OneStop-Reporting',
          score: 0.05024212598800659,
        },
        {
          title: 'Fakturagrunnlag i Innsikt',
          url: 'https://kundeportal.vismasoftware.no/s/article/r-er-fakturagrunnlaget-i-Innsikt-klart',
          score: 0.054484885185956955,
        },
        {
          title: 'Feil fakturaverdi på timer',
          url: 'https://kundeportal.vismasoftware.no/s/article/Feil-fakturaverdi-på-timer',
          score: 0.7418428063392639,
        },
      ],
    },
  },
};

export const Streaming: Story = {
  args: {
    status: 'pending',
    content: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chatMessage = (
      canvas.getByTestId
        ? canvas.getByTestId('chat-message')
        : canvasElement.querySelector('gaia-chat-message')
    ) as ChatMessage;

    const fullMessage =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et lectus ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc non massa faucibus, fermentum tellus viverra, hendrerit orci. Quisque elementum aliquet lacinia. Fusce id sollicitudin lorem. Aenean ultricies tellus auctor mi dictum vulputate. Cras molestie fermentum blandit. Sed vel lacus cursus, lobortis orci non, gravida arcu. Mauris dapibus risus justo, nec consectetur felis faucibus non. Maecenas feugiat interdum metus in elementum.\n\nCurabitur finibus, nulla sed dapibus rutrum, libero turpis pellentesque sem, in convallis tortor augue tempus arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In quis lacinia libero, sit amet bibendum tortor. Quisque ex lacus, congue non ligula at, bibendum ullamcorper diam. Sed blandit tellus sit amet dolor finibus semper. Pellentesque ut fermentum lectus. Nullam eget varius risus. Curabitur ac bibendum ipsum. Aliquam erat volutpat. Duis mi ante, pellentesque ut urna eu, efficitur blandit velit. Etiam aliquam arcu massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse et metus scelerisque libero vulputate lobortis. In ut ullamcorper augue.';
    let current = '';

    for (let i = 0; i < fullMessage.length; i += 10) {
      current += fullMessage.substring(i, i + 10);
      if (chatMessage) {
        chatMessage.data = {
          ...chatMessage.data,
          content: current,
          status: 'pending',
        };
      }
      await new Promise((resolve) => setTimeout(resolve, 40));
    }

    if (chatMessage) {
      chatMessage.data = {
        ...chatMessage.data,
        content: fullMessage,
        status: 'completed',
      };
    }
  },
  render: (args) => html`
    <gaia-chat-message
      .data=${{
        id: uuidv4(),
        role: 'assistant',
        content: args.content,
        status: args.status,
      }}
      data-testid="chat-message"
    ></gaia-chat-message>
  `,
};

export const Thinking: Story = {
  args: {
    status: 'pending',
    content: '',
  },
};
