import { css } from 'lit';

export const avatarStyles = css`
  :host {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    aspect-ratio: 1 / 1;
    overflow: hidden;
  }

  :host([size='xs']) {
    width: var(--size-16);
    height: var(--size-16);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xs);
    line-height: var(--lineheight-xs);
    letter-spacing: var(--tracking-xs);
  }

  :host([size='sm']) {
    width: var(--size-24);
    height: var(--size-24);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
  }

  :host([size='md']) {
    width: var(--size-40);
    height: var(--size-40);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-lg);
    line-height: var(--lineheight-lg);
    letter-spacing: var(--tracking-lg);
  }

  :host([size='lg']) {
    width: var(--size-64);
    height: var(--size-64);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-2xl);
    line-height: var(--lineheight-2xl);
    letter-spacing: var(--tracking-2xl);
  }

  .avatar {
    position: relative;
    display: inline-flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: var(--border-width-sm) solid var(--border-disabled);
    background-color: var(--surface-disabled);
    overflow: hidden;
  }

  .avatar > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }

  .avatar__overlay {
    position: absolute;
    inset: 0;
    background: #13344540;
    pointer-events: none;
    opacity: 0;
    z-index: 1;
  }

  :host(:not([disabled])) .avatar,
  :host(:not([disabled])) .avatar__overlay {
    transition-property:
      color, background-color, border-color, text-decoration-color, opacity, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  :host([disabled]) .avatar > img {
    filter: saturate(0%);
  }

  :host([disabled]) .avatar__overlay {
    background: #ffffffb2;
    opacity: 1;
  }

  .avatar:has(.avatar__initials) {
    background-color: var(--surface-primary);
    border-color: var(--border-primary);
  }

  :host(:not([disabled])) .avatar:hover {
    cursor: pointer;
  }

  :host(:not([disabled])) .avatar:hover:has(.avatar__initials) {
    background-color: var(--surface-action-hover-2);
    border-color: var(--border-action-hover);
    color: var(--text-action);
  }

  :host([disabled]) .avatar:has(.avatar__initials) {
    background-color: var(--surface-disabled);
    border-color: var(--border-disabled);
    color: var(--text-on-disabled);
  }

  :host(:not([disabled])) .avatar:hover:has(.avatar__image) .avatar__overlay {
    opacity: 1;
  }

  .avatar__status-container {
    position: absolute;
    box-sizing: border-box;
    bottom: -1px;
    right: -1px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: var(--surface-primary);
    z-index: 2;
    border: var(--border-width-sm) solid var(--surface-primary);
  }

  :host([size='xs']) .avatar__status-container {
    visibility: hidden;
    opacity: 0;
  }

  :host([size='sm']) .avatar__status-container {
    width: 14px;
    height: 14px;
  }

  :host([size='md']) .avatar__status-container {
    width: 20px;
    height: 20px;
    padding: 2px;
  }

  :host([size='lg']) .avatar__status-container {
    width: 30px;
    height: 30px;
    padding: 2px;
  }

  .avatar__status-icon {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: inherit;
    background-color: var(--icon-success);
    border: var(--border-width-sm) solid var(--surface-primary);
  }
`;
