import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-button')
export class MyButton extends LitElement {
  static styles = css`
    button {
      background-color: royalblue;
      color: white;
      border: none;
      padding: 0.5em 1em;
      border-radius: 8px;
      cursor: pointer;
    }
  `;

  @property({ type: String }) label = 'Click Me';

  render() {
    return html`<button @click=${this._handleClick}>${this.label}</button>`;
  }

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('my-click', { bubbles: true, composed: true }));
  }
}
