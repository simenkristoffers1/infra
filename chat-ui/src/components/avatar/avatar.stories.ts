import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Avatar',
  component: 'gaia-avatar',
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    initials: {
      control: 'text',
    },
    src: {
      control: 'text',
    },
  },
  args: {
    size: 'md',
    disabled: false,
  },
  render: (args) => html`
    <gaia-avatar
      .size=${args.size}
      .initials=${args.initials}
      .src=${args.src}
      .disabled=${args.disabled}
    ></gaia-avatar>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Initials: Story = {
  args: {
    initials: 'JB',
  },
};

export const InitialsDisabled: Story = {
  args: {
    initials: 'JB',
    disabled: true,
  },
};
