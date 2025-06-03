import classnames from 'classnames';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import { ICON_MAP } from '@/constants/icon-map';
import { Icon } from '@/types/icons';

import { buttonStyles } from './button.styles';

@customElement('gaia-button')
export class Button extends LitElement {
  static styles = [buttonStyles];

  @property({ type: String })
  variant: 'primary' | 'secondary' | 'ghost' = 'primary';

  @property({ type: String })
  size: 'default' | 'icon' | 'icon-sm' = 'default';

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: String })
  icon: Icon | undefined = undefined;

  render() {
    return html`
      <button
        ?disabled=${this.disabled}
        class=${classnames({
          'btn--primary': this.variant === 'primary',
          'btn--secondary': this.variant === 'secondary',
          'btn--ghost': this.variant === 'ghost',
          'btn--default': this.size === 'default',
          'btn--icon': this.size === 'icon',
          'btn--icon-sm': this.size === 'icon-sm',
        })}
      >
        ${this.icon ? unsafeSVG(ICON_MAP[this.icon]) : ''}
        <slot class="btn__text"></slot>
      </button>
    `;
  }
}
