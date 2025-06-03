import classnames from 'classnames';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import { ICON_MAP } from '@/constants/icon-map';
import { Icon } from '@/types/icons';

import { menuItemStyles } from './menu-item.styles';

@customElement('gaia-menu-item')
export class MenuItem extends LitElement {
  static styles = [menuItemStyles];

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: String })
  iconLeft: Icon | undefined;

  @property({ type: String })
  iconRight: Icon | undefined;

  @property({ type: String })
  label: string | undefined;

  render() {
    return html`
      <div
        class="menu-item ${classnames({
          'menu-item--disabled': this.disabled,
        })}"
      >
        ${this.iconLeft &&
        html`<div class="menu-item__icon menu-item__icon--left">
          ${unsafeSVG(ICON_MAP[this.iconLeft])}
        </div>`}
        <span class="menu-item__content">
          <span class="menu-item__label">${this.label}</span>
          <span class="menu-item__description">
            <slot></slot>
          </span>
        </span>
        ${this.iconRight &&
        html`<div class="menu-item__icon menu-item__icon--right">
          ${unsafeSVG(ICON_MAP[this.iconRight])}
        </div>`}
      </div>
    `;
  }
}
