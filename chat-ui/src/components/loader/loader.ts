import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { loaderStyles } from './loader.styles';

@customElement('gaia-loader')
export class Loader extends LitElement {
  static styles = [loaderStyles];

  @property({ type: String, attribute: 'type', reflect: true })
  type: 'spinner' | 'typing' | 'thinking' = 'spinner';

  @property({ type: String, attribute: 'alignment', reflect: true })
  alignment: 'left' | 'right' = 'left';

  @property({ type: Boolean, attribute: 'show-text' })
  showText: boolean = true;

  @property({ type: String, attribute: 'text' })
  text: string | undefined = undefined;

  render() {
    return html`
      <div class="loader" role="status" aria-live="polite" aria-busy="true"></div>
      ${this.text && this.showText ? html`<span class="loader-text">${this.text}</span>` : ''}
    `;
  }
}
