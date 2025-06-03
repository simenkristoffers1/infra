import { css } from 'lit';

export const buttonStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  button {
    display: inline-flex;
    box-sizing: border-box;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    gap: var(--size-8);
    white-space: nowrap;
    background: none;
    border: 1px solid transparent;
    border-radius: var(--radius-default);
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    font-weight: var(--font-weight-medium);
    line-height: var(--lineheight-lg);
  }

  button:not(:disabled) {
    cursor: pointer;
  }

  button:focus-visible {
    outline-color: var(--border-focus);
    outline-width: var(--border-width-md);
    outline-style: solid;
    outline-offset: var(--size-2);
  }

  svg {
    display: block;
    flex-shrink: 0;
    fill: none;
    stroke: currentColor;
    pointer-events: none;
    width: var(--size-24);
    height: var(--size-24);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .btn--default {
    height: var(--size-40);
    padding: var(--size-8) var(--size-16);
  }

  .btn--icon {
    height: var(--size-40);
    width: var(--size-40);
  }

  .btn--icon-sm {
    height: var(--size-24);
    width: var(--size-24);
  }

  .btn--icon-sm > svg {
    width: var(--size-16);
    height: var(--size-16);
  }

  .btn--icon > .btn__text,
  .btn--icon-sm > .btn__text {
    display: none;
  }

  .btn--primary {
    background-color: var(--surface-action);
    color: var(--text-on-action);
  }

  .btn--primary > svg {
    color: var(--icon-on-action);
  }

  .btn--primary:hover {
    background-color: var(--surface-action-hover);
  }

  .btn--primary:disabled {
    background-color: var(--surface-disabled);
    color: var(--text-disable-selected);
  }

  .btn--primary:disabled > svg {
    color: var(--icon-on-disabled);
  }

  .btn--secondary {
    background-color: var(--surface-primary);
    color: var(--text-action);
    border-color: var(--border-action);
  }

  .btn--secondary > svg {
    color: var(--icon-action);
  }

  .btn--secondary:hover {
    background-color: var(--surface-action-hover-2);
    color: var(--text-action-hover);
  }

  .btn--secondary:hover > svg {
    color: var(--icon-action-hover);
  }

  .btn--secondary:disabled {
    background-color: var(--surface-page);
    color: var(--text-disabled);
    border-color: var(--border-disabled);
  }

  .btn--secondary:disabled > svg {
    color: var(--icon-on-disabled);
  }

  .btn--ghost {
    color: var(--text-action);
  }

  .btn--ghost > svg {
    color: var(--icon-action);
  }

  .btn--ghost:hover {
    color: var(--text-action-hover);
  }

  .btn--ghost:hover > svg {
    color: var(--icon-action-hover);
  }

  .btn--ghost:disabled {
    color: var(--text-disabled);
  }

  .btn--ghost:disabled > svg {
    color: var(--icon-disabled);
  }
`;
