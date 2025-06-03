import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { chatInputStyles } from './chat-input.styles';

@customElement('gaia-chat-input')
export class ChatInput extends LitElement {
  static styles = [chatInputStyles];

  @property({ type: Boolean, attribute: false })
  disabled: boolean = false;

  @property({ type: Boolean, attribute: false })
  loading: boolean = false;

  @state()
  private isButtonDisabled: boolean = true;

  @query('textarea.chat-input__textarea')
  private textarea?: HTMLTextAreaElement;

  private getChatInputHeight(): number {
    const style = getComputedStyle(this);
    return Number(style.getPropertyValue('--chat-input-height').trim().replace('px', ''));
  }

  private getChatInputMaxRows(): number {
    const style = getComputedStyle(this);
    return Number(style.getPropertyValue('--chat-input-max-rows').trim());
  }

  private updateTextareaStyles() {
    if (!this.textarea) {
      return;
    }

    const height = this.getChatInputHeight();
    const maxHeight = height * this.getChatInputMaxRows();
    if (this.textarea.value === '') {
      this.textarea.style.height = `${height}px`;
      return;
    }

    this.isButtonDisabled = this.textarea.value === '';
    this.textarea.style.height = `${this.textarea.scrollHeight}px`;
    if (this.textarea.scrollHeight > maxHeight) {
      this.textarea.style.overflowY = 'auto';
    } else {
      this.textarea.style.overflowY = 'hidden';
    }
  }

  private handleInput() {
    this.updateTextareaStyles();
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private sendMessage() {
    if (!this.textarea || !this.textarea.value) {
      return;
    }
    this.dispatchEvent(new CustomEvent('send-message', { detail: this.textarea.value }));
    this.textarea.value = '';
    this.updateTextareaStyles();
  }

  render() {
    return html`
      <textarea
        class="chat-input__textarea"
        name="message"
        autocomplete="off"
        spellcheck="false"
        placeholder="Ask anything"
        rows="1"
        ?disabled=${this.disabled}
        @input=${this.handleInput}
        @keydown=${this.handleKeyDown}
      ></textarea>
      ${this.loading && !this.disabled
        ? html`<gaia-loader class="chat-input__loader" size="sm"></gaia-loader>`
        : html`<gaia-button
            ?disabled=${this.isButtonDisabled || this.disabled}
            class="chat-input__button"
            size="icon-sm"
            icon="arrow-up"
            @click=${this.sendMessage}
          ></gaia-button>`}
    `;
  }
}
