import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { cardStyles } from './card.styles';

@customElement('gaia-card')
export class Card extends LitElement {
  static styles = [cardStyles];

  render() {
    return html`
      <div class="card">
        <slot></slot>
      </div>
    `;
  }
}
