import { css } from 'lit';

export const spacingStyles = css`
  :host {
    align-items: center;
  }

  :host:has(.spacing--horizontal) {
    display: flex;
    width: 100%;
    flex-direction: row;
  }

  :host:has(.spacing--vertical) {
    display: inline-flex;
    height: 100%;
    flex-direction: column;
  }

  .spacing {
    background-color: var(--border-primary);
  }

  .spacing--horizontal {
    height: 1px;
    width: 100%;
    margin: var(--size-4) 0;
  }

  .spacing--vertical {
    display: inline-flex;
    width: 1px;
    margin: 0 var(--size-4);
    height: var(--size-16);
  }
`;
