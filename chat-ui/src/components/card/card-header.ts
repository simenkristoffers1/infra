import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { cardHeaderStyles } from './card-header.styles';

@customElement('gaia-card-header')
export class CardHeader extends LitElement {
  static styles = [cardHeaderStyles];

  @property({ type: String })
  title: string = '';

  render() {
    return html`
      <div class="card-header">
        <div class="card-header__title">${this.title}</div>
        <div class="card-header__actions">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
