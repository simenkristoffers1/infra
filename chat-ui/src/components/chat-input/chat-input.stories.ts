import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/ChatInput',
  component: 'gaia-chat-input',
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is loading',
    },
  },
  args: {
    disabled: false,
    loading: false,
  },
  render: (args) => html`
    <gaia-chat-input .disabled=${args.disabled} .loading=${args.loading}> </gaia-chat-input>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    disabled: false,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    disabled: false,
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    loading: false,
  },
};
