import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'gaia-tooltip',
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom', 'right', 'left', 'top'],
    },
    alignment: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
  args: {
    position: 'top',
    alignment: 'center',
  },
  render: (args) => html`
    <div
      style="width: 400px; height: 400px; display: flex; justify-content: center; align-items: center;"
    >
      <div>
        <gaia-tooltip
          .text=${'Tooltip content'}
          .position=${args.position}
          .alignment=${args.alignment}
        >
          <gaia-button>Hover me</gaia-button>
        </gaia-tooltip>
      </div>
    </div>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
};
