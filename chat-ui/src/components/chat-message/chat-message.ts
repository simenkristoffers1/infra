import classnames from 'classnames';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { SquareArrowOutUpRight } from 'lucide-static';
import { marked } from 'marked';

import { ActionApprovalEvent } from '@/types/events';
import {
  AssistantChatMessage,
  ChatMessage as ChatMessageType,
  isAssistantChatMessage,
  isOperatorChatMessage,
  isSystemChatMessage,
  isUserChatMessage,
  isVisitorChatMessage,
  OperatorChatMessage,
  SystemChatMessage,
  UserChatMessage,
  VisitorChatMessage,
} from '@/types/models/chat-message';

import { chatMessageStyles } from './chat-message.styles';
import { markdownStyles } from './markdown.styles';

@customElement('gaia-chat-message')
export class ChatMessage extends LitElement {
  static styles = [chatMessageStyles, markdownStyles];

  @property({ type: Object })
  data: ChatMessageType | null = null;

  @property({ type: Boolean, attribute: 'loading' })
  loading = false;

  @property({ type: String, attribute: 'loading-text' })
  loadingText = 'Thinking...';

  private submitActionApproval(isApproved: boolean) {
    if (!this.data?.id) {
      throw new Error('Message ID is required');
    }
    this.dispatchEvent(new ActionApprovalEvent(this.data.id, isApproved));
  }

  private renderUserMessage(message: UserChatMessage) {
    return html`
      <div class="message__content--left"></div>
      <div class="message__content--right">
        <div class="markdown">
          ${unsafeHTML(
            marked(message.content, {
              async: false,
            })
          )}
        </div>
      </div>
    `;
  }

  private _copyToClipboard(content: string) {
    navigator.clipboard.writeText(content);
  }

  private renderAssistantMessage(message: AssistantChatMessage) {
    const renderExtras = () => {
      switch (message.status) {
        case 'completed':
          return html`
            ${message.metadata?.citations && message.metadata.citations.length > 0
              ? html`<div class="message__citations">
                  ${message.metadata.citations.map(
                    (citation) => html`
                      <div class="citation">
                        <a href="${citation.url}" target="_blank"
                          >${citation.title} ${unsafeSVG(SquareArrowOutUpRight)}</a
                        >
                      </div>
                    `
                  )}
                </div> `
              : ''}
            <div class="button-group">
              <gaia-tooltip text="Copy" position="bottom">
                <gaia-button
                  icon="copy"
                  variant="ghost"
                  size="icon-sm"
                  @click=${() => this._copyToClipboard(message.content)}
                ></gaia-button>
              </gaia-tooltip>
              <gaia-spacing direction="vertical"></gaia-spacing>
              <gaia-tooltip text="Good response" position="bottom">
                <gaia-button icon="thumbs-up" variant="ghost" size="icon-sm"></gaia-button>
              </gaia-tooltip>
              <gaia-tooltip text="Bad response" position="bottom">
                <gaia-button icon="thumbs-down" variant="ghost" size="icon-sm"></gaia-button>
              </gaia-tooltip>
            </div>
          `;
        case 'waitingForApproval':
          return html`<div class="button-group">
            <gaia-button variant="secondary" @click=${() => this.submitActionApproval(true)}
              >Yes</gaia-button
            >
            <gaia-button variant="secondary" @click=${() => this.submitActionApproval(false)}
              >No</gaia-button
            >
          </div>`;
        default:
          return '';
      }
    };
    return html`
      <div class="message__content--left">
        <gaia-avatar size="sm" initials="AI"></gaia-avatar>
      </div>

      <div class="message__content--right">
        <div class="markdown">
          ${unsafeHTML(
            marked(message.content, {
              async: false,
            })
          )}
        </div>
        ${renderExtras()}
      </div>
    `;
  }

  private renderVisitorMessage(message: VisitorChatMessage) {
    return html`
      <div class="message__content--left"></div>
      <div class="message__content--right">
        <div class="markdown">
          ${unsafeHTML(
            marked(message.content, {
              async: false,
            })
          )}
        </div>
      </div>
    `;
  }

  private renderOperatorMessage(message: OperatorChatMessage) {
    return html`
      <div class="message__content--left">
        <gaia-tooltip text="Active" position="right">
          <gaia-avatar
            size="sm"
            status="active"
            .src=${message.operatorAvatar ?? undefined}
          ></gaia-avatar>
        </gaia-tooltip>
      </div>

      <div class="message__content--right">
        <div class="markdown">
          ${message.status === 'typing'
            ? html`<gaia-loader type="typing"></gaia-loader>`
            : unsafeHTML(
                marked(message.content, {
                  async: false,
                })
              )}
        </div>
      </div>
    `;
  }

  private renderSystemMessage(message: SystemChatMessage) {
    return html`
      <div class="message__content--left"></div>
      <div class="message__content--right">
        <div class="message__content markdown">
          ${unsafeHTML(
            marked(message.content, {
              async: false,
            })
          )}
        </div>
      </div>
    `;
  }

  private renderLoadingMessage() {
    return html`<div class="message__content--left">
        <gaia-loader type="thinking"></gaia-loader>
      </div>
      <div class="message__content--right">
        <div class="markdown">${this.loadingText}</div>
      </div> `;
  }

  private renderMessage(message: ChatMessageType) {
    if (isUserChatMessage(message)) {
      return this.renderUserMessage(message);
    } else if (isVisitorChatMessage(message)) {
      return this.renderVisitorMessage(message);
    } else if (isAssistantChatMessage(message)) {
      return this.renderAssistantMessage(message);
    } else if (isOperatorChatMessage(message)) {
      return this.renderOperatorMessage(message);
    } else if (isSystemChatMessage(message)) {
      return this.renderSystemMessage(message);
    }
    return '';
  }

  render() {
    if (this.loading) {
      return html` <div class="message message--assistant">${this.renderLoadingMessage()}</div> `;
    }
    if (!this.data || (this.data.status !== 'typing' && this.data.content === '')) {
      return null;
    }

    return html`
      <div
        class="message ${classnames({
          'message--user': this.data.role === 'user' || this.data.role === 'visitor',
          'message--assistant': this.data.role === 'assistant' || this.data.role === 'operator',
          'message--system': this.data.role === 'system',
          'status--error': this.data.status === 'error',
          'status--info': this.data.status === 'info',
          'status--warning': this.data.status === 'warning',
          'status--success': this.data.status === 'success',
        })}"
      >
        ${this.renderMessage(this.data)}
      </div>
    `;
  }
}
