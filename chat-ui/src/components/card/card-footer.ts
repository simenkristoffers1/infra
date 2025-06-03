import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { cardFooterStyles } from './card-footer.styles';

@customElement('gaia-card-footer')
export class CardFooter extends LitElement {
  static styles = [cardFooterStyles];

  render() {
    return html`
      <div class="card-footer">
        <slot></slot>
      </div>
    `;
  }
}
