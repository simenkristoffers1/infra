import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { tooltipStyles } from './tooltip.styles';

@customElement('gaia-tooltip')
export class Tooltip extends LitElement {
  static styles = [tooltipStyles];

  @state()
  _open: boolean = false;

  @property({ type: String, attribute: 'position', reflect: true })
  position: 'bottom' | 'right' | 'left' | 'top' = 'top';

  @property({ type: String, attribute: 'alignment', reflect: true })
  alignment: 'start' | 'center' | 'end' = 'center';

  @property({ type: String, attribute: 'title' })
  title: string = '';

  @property({ type: String, attribute: 'text' })
  text: string = '';

  @property({ type: Number, attribute: 'delay' })
  delay: number = 500;

  @property({ type: Boolean, attribute: 'disabled' })
  disabled: boolean = true; // Disable for now, not working properly

  private _timeoutId: number | undefined;

  _show() {
    if (this.disabled) return;
    this._timeoutId = window.setTimeout(() => {
      this._open = true;
    }, this.delay);
  }

  _hide() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = undefined;
    }
    this._open = false;
  }

  render() {
    return html`
      <slot @mouseenter=${this._show} @mouseleave=${this._hide}></slot>
      <div class="tooltip" ?open=${this._open}>
        ${this.title && this.title.length > 0
          ? html`<div class="tooltip__title">${this.title}</div>`
          : null}
        <div class="tooltip__text">${this.text}</div>
      </div>
    `;
  }
}
