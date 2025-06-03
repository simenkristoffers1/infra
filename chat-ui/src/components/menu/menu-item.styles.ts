import { css } from 'lit';

export const menuItemStyles = css`
  .menu-item {
    display: flex;
    align-items: flex-start;
    gap: var(--size-8);
    padding: var(--size-8) var(--size-12) var(--size-8) var(--size-12);
    border-bottom-width: var(--border-width-sm);
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .menu-item:hover:not(.menu-item--disabled) {
    background-color: var(--surface-action-hover-2);
    cursor: pointer;
  }

  .menu-item:hover:not(.menu-item--disabled) .menu-item__label {
    color: var(--text-action-hover);
  }

  .menu-item__content {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    flex: 1 1 0;
  }

  .menu-item__label {
    display: inline-flex;
    align-items: center;
    height: var(--size-20);
    font-weight: var(--font-weight-medium);
    line-height: var(--size-16);
    color: var(--text-action);
  }

  .menu-item__description {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-regular);
    line-height: var(--lineheight-xs);
    letter-spacing: var(--tracking-xs);
    color: var(--text-disable-selected);
  }

  .menu-item__icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-top: var(--size-2);
    padding-bottom: var(--size-2);
  }

  .menu-item__icon svg {
    color: var(--icon-primary);
    width: var(--size-16);
    height: var(--size-16);
  }

  .menu-item--disabled .menu-item__label {
    color: var(--text-disable-selected);
  }

  .menu-item--disabled .menu-item__icon svg {
    color: var(--icon-on-disabled);
  }

  .menu-item--disabled .menu-item__description {
    color: var(--text-disable-selected);
  }
`;
