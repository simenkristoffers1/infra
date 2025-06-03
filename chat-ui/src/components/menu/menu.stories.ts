import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
const meta: Meta = {
  title: 'Components/Menu',
  component: 'gaia-menu',
  render: () => html`
    <div style="width: 400px;height: 400px;margin: 0 auto;">
      <gaia-menu .open=${true}>
        <gaia-menu-item label="Item 1"> Some description of the item </gaia-menu-item>
        <gaia-menu-item label="Item 2" iconLeft="refresh-cw" iconRight="arrow-up-right">
          Some description of the item
        </gaia-menu-item>
        <gaia-menu-item label="Item 2" iconLeft="refresh-cw" iconRight="arrow-up-right" disabled>
          Disabled item
        </gaia-menu-item>
        <gaia-menu-item label="Item 2" iconLeft="refresh-cw" iconRight="arrow-up-right">
        </gaia-menu-item>
        <gaia-menu-item label="Item 4" iconLeft="refresh-cw"> </gaia-menu-item>
        <gaia-menu-item label="Item 5" iconRight="arrow-up-right"> </gaia-menu-item>
      </gaia-menu>
    </div>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
};
