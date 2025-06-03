import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { avatarStyles } from './avatar.styles';

@customElement('gaia-avatar')
export class Avatar extends LitElement {
  static styles = [avatarStyles];

  @property({ type: String, attribute: 'size', reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, attribute: 'disabled', reflect: true })
  disabled: boolean = false;

  @property({ type: String, attribute: 'status', reflect: true })
  status: 'active' | 'away' | 'offline' | undefined = undefined;

  @property({ type: String, attribute: 'src' })
  src: string | undefined = undefined;

  @property({ type: String, attribute: 'initials' })
  initials: string | undefined = undefined;

  @property({ type: String, attribute: 'fallback' })
  fallback: string = 'https://github.com/shadcn.png';

  private _renderAvatar() {
    if (this.src) {
      return html`<img class="avatar__image" src=${this.src} alt="Avatar" />
        <div class="avatar__overlay"></div>`;
    }

    if (this.initials) {
      return html`<div class="avatar__initials">
        ${this.initials.substring(0, 2).toUpperCase()}
      </div>`;
    }

    return html`<img class="avatar__image" src=${this.fallback} alt="Avatar" />
      <div class="avatar__overlay"></div>`;
  }
  render() {
    return html`
      <div class="avatar">${this._renderAvatar()}</div>
      ${this.status
        ? html`<div class="avatar__status-container">
            <div class="avatar__status-icon"></div>
          </div>`
        : ''}
    `;
  }
}
