import { css } from 'lit';

export const chatMessageStyles = css`
  :host {
    display: block;
    width: 100%;
    color: var(--text-body);
    box-sizing: border-box;
  }

  .message {
    display: flex;
    flex-direction: row;
    position: relative;
    padding: var(--size-8) 0;
    max-width: 100%;
  }

  .button-group {
    display: flex;
    flex-direction: row;
    height: 100%;
    gap: var(--size-4);
    align-items: center;
    padding-top: var(--size-8);
  }

  .message__content--left {
    display: inline-flex;
    align-items: flex-start;
    justify-content: center;
    width: var(--size-24);
    padding: var(--size-6) var(--size-0) var(--size-4) var(--size-0);
    flex-shrink: 0;
  }

  .message__content--right {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: var(--radius-default);
    padding: var(--size-8);
    overflow: hidden;
  }

  .message--user {
    justify-content: flex-end;
  }

  .message--user > .message__content--right {
    background-color: var(--color-neutral-10);
  }

  .message--assistant {
    align-self: flex-start;
    padding-left: var(--size-16);
  }

  .message--system {
    justify-content: center;
    min-width: 100px;
  }

  .message--system .message__content--right .markdown {
    font-size: var(--font-size-xs);
    line-height: var(--lineheight-xs);
    font-weight: var(--font-weight-regular);
    letter-spacing: var(--tracking-xs);
    color: var(--text-body);
    text-align: center;
  }

  .message--system.status--warning > .message__content--right {
    background-color: #fcf0e7;
    border: 1px solid #bb5822;
  }

  .message--system.status--info > .message__content--right {
    background-color: #edf4fe;
    border: 1px solid #366af6;
  }

  .message--system.status--success > .message__content--right {
    background-color: #eef5ee;
    border: 1px solid #448548;
  }

  .message--system.status--error > .message__content--right {
    background-color: #fcf1ee;
    border: 1px solid #cc453e;
  }

  .message__citations {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: var(--size-8);
    gap: var(--size-4);
  }

  .citation {
    display: flex;
    padding: 0 var(--size-2);
    transition-property: color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .citation a {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--size-4);
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    font-weight: var(--font-weight-regular);
    letter-spacing: var(--tracking-sm);
    color: var(--text-action);
    text-decoration: none;
    transition-property: inherit;
    transition-timing-function: inherit;
    transition-duration: inherit;
  }

  .citation a > svg {
    color: var(--icon-action);
    width: var(--size-16);
    height: var(--size-16);
    flex-shrink: 0;
    transition-property: inherit;
    transition-timing-function: inherit;
    transition-duration: inherit;
  }

  .citation:hover a {
    color: var(--text-action-hover);
  }

  .citation:hover a > svg {
    color: var(--icon-action-hover);
  }
`;
