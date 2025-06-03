import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import { ICON_MAP } from '../../constants/icon-map';

const meta: Meta = {
  title: 'Components/Button',
  component: 'gaia-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'The variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'icon', 'icon-sm'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    withIcon: {
      control: 'boolean',
      description: 'Whether to use an icon',
    },
    icon: {
      control: 'select',
      options: Object.keys(ICON_MAP),
      description: 'The icon of the button',
      if: {
        arg: 'withIcon',
        eq: true,
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'default',
    disabled: false,
    withIcon: true,
    icon: 'square-pen',
  },
  render: (args) => html`
    <gaia-button
      .variant=${args.variant}
      .disabled=${args.disabled}
      .icon=${args.icon}
      .size=${args.size}
    >
      ${args.text}
    </gaia-button>
  `,
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'default',
    disabled: false,
    withIcon: true,
    icon: 'square-pen',
    text: 'Click me',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'default',
    disabled: false,
    withIcon: true,
    icon: 'square-pen',
    text: 'Click me',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'default',
    disabled: false,
    withIcon: true,
    icon: 'square-pen',
    text: 'Click me',
  },
};

export const IconDefault: Story = {
  args: {
    variant: 'primary',
    size: 'icon',
    disabled: false,
    withIcon: true,
    icon: 'square-pen',
  },
};

export const IconSecondary: Story = {
  args: {
    variant: 'secondary',
    size: 'icon',
    disabled: false,
    withIcon: true,
    icon: 'square-pen',
  },
};

export const IconGhost: Story = {
  args: {
    variant: 'ghost',
    size: 'icon',
    disabled: false,
    withIcon: true,
    icon: 'square-pen',
  },
};
