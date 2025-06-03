import { PropertyValues, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

import { ChatController } from '@/controllers/chat-controller';
import { SupportController } from '@/controllers/support-controller';
import { ActionApprovalEvent } from '@/types/events';
import { ChatControllerHost } from '@/types/interfaces/chat-controller-host';
import { Conversation } from '@/types/models/conversation';

import { BaseComponent } from '../base';
import { CardContent } from '../card/card-content';

import { chatStyles } from './chat.styles';

@customElement('gaia-chat')
export class ChatContainer extends BaseComponent implements ChatControllerHost {
  static styles = [chatStyles];

  private readonly chatController: ChatController;
  private readonly supportController: SupportController;

  private cardContentRef = createRef<CardContent>();
  private _messageCount = 0;

  constructor() {
    super();
    this.chatController = new ChatController(this);
    this.supportController = new SupportController(this);
  }

  public scrollToBottom() {
    const chatContent = this.cardContentRef.value;
    if (chatContent) {
      chatContent.scrollToBottom();
    }
  }

  updated(changedProps: PropertyValues) {
    if (changedProps.has('conversation') || changedProps.has('loading')) {
      const newMessageCount = Object.values(this.conversation.messages).length;
      if (newMessageCount > this._messageCount) {
        this._messageCount = newMessageCount;
        requestAnimationFrame(() => {
          setTimeout(() => {
            const cardContent = this.cardContentRef.value;
            if (cardContent) {
              cardContent.scrollToBottom();
            }
          }, 0);
        });
      }
    }
  }

  @property({ type: String, attribute: 'profile-id' })
  profileId: string | null = null;

  @property({ type: String, attribute: 'base-url' })
  baseUrl: string =
    'https://ca-aiasst-api-stag-noe.salmonsea-e473e4fa.norwayeast.azurecontainerapps.io';

  @property({ type: String, attribute: 'team-id' })
  teamId: string = '8ooN7adZRoW3DGbc0tSLBA';

  @state()
  conversation: Conversation = {
    id: null,
    messages: {},
  };

  @state()
  loading = false;

  private _newConversation() {
    this.supportController.disconnectFromSupport();
    this.conversation = {
      id: null,
      messages: {},
    };
  }

  handleConnectSupport() {
    this.supportController.connectToSupport(this.conversation, this.teamId);
  }

  handleSendMessage(event: CustomEvent<string>) {
    if (this.supportController.isConnected) {
      this.supportController.sendMessage(event.detail);
    } else {
      this.chatController.sendMessage(event.detail);
    }
  }

  handleActionApproval(event: ActionApprovalEvent) {
    this.chatController.sendActionApproval(event);
  }

  render() {
    return html`
      <div class="chat-container">
        <gaia-card>
          <gaia-card-header title="Assistant">
            <gaia-button
              variant="ghost"
              size="icon-sm"
              icon="square-pen"
              @click=${this._newConversation}
            ></gaia-button>
            <gaia-menu>
              <gaia-menu-item iconLeft="trash-2" label="Clear data history">
                By clearing data history, the chat will be restarted.
              </gaia-menu-item>
              <gaia-spacing></gaia-spacing>
              <gaia-menu-item
                iconLeft="info"
                iconRight="arrow-up-right"
                label="Learn more"
              ></gaia-menu-item>
              <gaia-menu-item
                iconLeft="text"
                iconRight="arrow-up-right"
                label="Terms of use"
              ></gaia-menu-item>
              <gaia-menu-item
                iconLeft="shield"
                iconRight="arrow-up-right"
                label="Privacy statement"
              ></gaia-menu-item>
              <gaia-spacing></gaia-spacing>
              <gaia-menu-item
                iconLeft="thumbs-up"
                iconRight="arrow-up-right"
                label="Give feedback"
              ></gaia-menu-item>
            </gaia-menu>
          </gaia-card-header>
          <gaia-card-content ${ref(this.cardContentRef)}>
            <!--
          Uncomment this to enable support chat
           <gaia-button @click=${this.handleConnectSupport}>Connect to support</gaia-button> 
           -->
            ${Object.values(this.conversation.messages)
              .filter((message) => message.role !== 'tool')
              .map(
                (message) => html`
                  <gaia-chat-message
                    .data=${message}
                    @action-approval=${this.handleActionApproval}
                  ></gaia-chat-message>
                `
              )}
            ${this.loading ? html`<gaia-chat-message loading></gaia-chat-message>` : ''}
          </gaia-card-content>
          <gaia-card-footer>
            <gaia-chat-input @send-message=${this.handleSendMessage}></gaia-chat-input>
          </gaia-card-footer>
        </gaia-card>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gaia-chat': ChatContainer;
  }
}
