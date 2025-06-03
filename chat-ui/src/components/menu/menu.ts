import classnames from 'classnames';
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { menuStyles } from './menu.styles';

@customElement('gaia-menu')
export class Menu extends LitElement {
  static styles = [menuStyles];

  @state()
  open = false;

  private boundHandleClickOutside = this.handleClickOutside.bind(this);

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.open = !this.open;

    if (this.open) {
      document.addEventListener('click', this.boundHandleClickOutside);
    } else {
      document.removeEventListener('click', this.boundHandleClickOutside);
    }
  }

  handleClickOutside(event: MouseEvent) {
    if (this.open && !this.contains(event.target as Node)) {
      this.open = false;
      document.removeEventListener('click', this.boundHandleClickOutside);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.boundHandleClickOutside);
  }

  render() {
    return html`
      <div class="menu">
        <div
          class=${classnames('menu__button', {
            active: this.open,
          })}
        >
          <gaia-button
            variant="ghost"
            size="icon-sm"
            icon="ellipsis"
            @click=${this.toggleDropdown}
          ></gaia-button>
        </div>
        <div
          class=${classnames('menu__content', {
            open: this.open,
          })}
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
