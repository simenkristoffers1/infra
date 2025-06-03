import { css } from 'lit';

export const chatInputStyles = css`
  :host {
    display: flex;
    flex: 1 1 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--size-8);
    width: 100%;
    border-radius: var(--radius-default);
    padding: var(--size-8);
    background-color: var(--surface-primary);
    border: var(--border-width-sm) solid var(--border-primary);
    overflow: hidden;

    --chat-input-height: 24px;
    --chat-input-max-rows: 5;
  }

  :host:has(textarea:disabled) {
    background-color: var(--surface-disabled);
    border-color: var(--border-disabled);
  }

  :host:has(textarea:focus-visible) {
    outline: var(--border-width-md) solid var(--border-focus);
  }

  textarea.chat-input__textarea {
    width: 100%;
    height: var(--chat-input-height);
    max-height: calc(var(--chat-input-height) * var(--chat-input-max-rows));
    padding: 0;
    resize: none;
    border: none;
    outline: none;
    border-radius: 0;
    position: relative;
    font-family: var(--font-family-base);
    font-size: var(--font-size-md);
    line-height: var(--chat-input-height);
    font-weight: var(--font-weight-regular);
    color: var(--text-body);
    background: none;
  }

  .chat-input__loader {
    height: var(--size-24);
    width: var(--size-24);
  }

  textarea::placeholder {
    color: var(--text-disabled);
  }

  textarea:disabled::placeholder {
    color: var(--text-disable-selected);
  }

  textarea::-webkit-scrollbar-thumb {
    background: var(--icon-disabled);
    border-radius: var(--radius-default);
    cursor: pointer;
  }
  textarea::-webkit-scrollbar-track {
    background: var(--surface-page);
  }
  textarea::-webkit-scrollbar-thumb:hover {
    background: var(--icon-on-disabled);
  }
  textarea::-webkit-scrollbar {
    max-width: var(--size-4);
    max-height: var(--size-4);
  }
`;
