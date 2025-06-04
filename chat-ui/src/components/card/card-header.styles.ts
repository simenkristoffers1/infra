import { css } from 'lit';

export const cardHeaderStyles = css`
  :host {
    box-sizing: border-box;
    background-color: var(--surface-primary);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--size-16);
    border-bottom: var(--border-width-sm) solid var(--color-neutral-20);
  }

  .card-header__title {
    color: var(--text-body);
    font-weight: var(--font-weight-bold);
  }
`;
