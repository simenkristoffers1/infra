import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Loader',
  component: 'gaia-loader',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['spinner', 'typing', 'thinking'],
      description: 'The type of loader',
    },
    alignment: {
      control: 'select',
      options: ['left', 'right'],
      description: 'The alignment of the loader',
    },
    showText: {
      control: 'boolean',
      description: 'Whether to show the text',
    },
    text: {
      control: 'text',
      description: 'The text to display',
    },
  },
  args: {
    type: 'thinking',
    alignment: 'left',
    showText: true,
    text: 'Thinking...',
  },
  render: (args) =>
    html`<gaia-loader
      .type=${args.type}
      .alignment=${args.alignment}
      .showText=${args.showText}
      .text=${args.text}
    ></gaia-loader>`,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
};
