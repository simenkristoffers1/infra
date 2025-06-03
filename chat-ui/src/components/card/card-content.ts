import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import { cardContentStyles } from './card-content.styles';

@customElement('gaia-card-content')
export class CardContent extends LitElement {
  static styles = [cardContentStyles];

  @query('.scroller')
  private _scroller?: HTMLDivElement;

  public scrollToBottom() {
    if (this._scroller) {
      this._scroller.scrollTop = this._scroller.scrollHeight;
    }
  }

  render() {
    return html`
      <div class="scroller">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
