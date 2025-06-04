import { css } from 'lit';

export const cardFooterStyles = css`
  :host {
    background-color: var(--surface-primary);
  }
  .card-footer {
    display: flex;
    align-items: center;
    padding: var(--size-8) var(--size-16) var(--size-16) var(--size-16);
    border: var(--border-width-none);
  }
`;
