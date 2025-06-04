import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { BaseComponent } from '@/components/base';

import { popoverStyles } from './popover.styles';

@customElement('gaia-popover')
export class Popover extends BaseComponent {
  static styles = [popoverStyles];

  @property({
    type: Boolean,
    attribute: 'open',
    state: true,
    reflect: true,
  })
  open = true;

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('open')) {
      this.toggle();
    }
  }

  private boundHandleClickOutside = this.handleClickOutside.bind(this);

  toggle() {
    if (this.open) {
      document.addEventListener('click', this.boundHandleClickOutside);
    } else {
      document.removeEventListener('click', this.boundHandleClickOutside);
    }
  }

  handleClickOutside(event: MouseEvent) {
    if (this.open && !this.contains(event.target as Node)) {
      this.dispatchEvent(new CustomEvent('close', { bubbles: false, composed: false }));
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.boundHandleClickOutside);
  }

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gaia-popover': Popover;
  }
}
