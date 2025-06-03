import { css } from 'lit';

export const tooltipStyles = css`
  :host {
    position: relative;
    display: inline-flex;
  }

  .tooltip {
    position: absolute;
    background-color: var(--surface-action-hover);
    display: flex;
    min-width: fit-content;
    width: max-content;
    max-width: 400px;
    flex-direction: column;
    gap: var(--size-4);
    padding: var(--size-8);
    border-radius: var(--radius-default);
    color: var(--text-on-action);
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 300ms ease-in-out,
      visibility 300ms ease-in-out;
  }

  .tooltip[open] {
    opacity: 1;
    visibility: visible;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    box-sizing: border-box;
    border-width: 8px;
    border-style: solid;
  }

  .tooltip .tooltip__title {
    font-weight: var(--font-weight-semibold);
  }

  .tooltip .tooltip__text {
    font-weight: var(--font-weight-regular);
  }

  /* Bottom */

  :host([position='bottom']) .tooltip {
    top: calc(100% + var(--size-10));
  }

  :host([position='bottom']) .tooltip::after {
    bottom: 100%;
    border-color: transparent transparent var(--surface-action-hover) transparent;
  }

  :host([position='bottom'][alignment='start']) .tooltip {
    left: 0;
  }

  :host([position='bottom'][alignment='start']) .tooltip::after {
    left: var(--size-24);
  }

  :host([position='bottom'][alignment='center']) .tooltip {
    left: 50%;
    transform: translateX(-50%);
  }

  :host([position='bottom'][alignment='center']) .tooltip::after {
    left: 50%;
    transform: translateX(-50%);
  }

  :host([position='bottom'][alignment='end']) .tooltip {
    right: 0;
  }

  :host([position='bottom'][alignment='end']) .tooltip::after {
    right: var(--size-24);
  }

  /* Right */

  :host([position='right']) .tooltip {
    left: calc(100% + var(--size-10));
  }

  :host([position='right']) .tooltip::after {
    right: 100%;
    border-color: transparent var(--surface-action-hover) transparent transparent;
  }

  :host([position='right'][alignment='start']) .tooltip {
    top: 0;
  }

  :host([position='right'][alignment='start']) .tooltip::after {
    top: var(--size-24);
  }

  :host([position='right'][alignment='center']) .tooltip {
    top: 50%;
    transform: translateY(-50%);
  }

  :host([position='right'][alignment='center']) .tooltip::after {
    top: 50%;
    transform: translateY(-50%);
  }

  :host([position='right'][alignment='end']) .tooltip {
    bottom: 0;
  }

  :host([position='right'][alignment='end']) .tooltip::after {
    bottom: var(--size-24);
  }

  /* Top */

  :host([position='top']) .tooltip {
    bottom: calc(100% + var(--size-10));
  }

  :host([position='top']) .tooltip::after {
    top: 100%;
    border-color: var(--surface-action-hover) transparent transparent transparent;
  }

  :host([position='top'][alignment='start']) .tooltip {
    left: 0;
  }

  :host([position='top'][alignment='start']) .tooltip::after {
    left: var(--size-24);
  }

  :host([position='top'][alignment='center']) .tooltip {
    left: 50%;
    transform: translateX(-50%);
  }

  :host([position='top'][alignment='center']) .tooltip::after {
    left: 50%;
    transform: translateX(-50%);
  }

  :host([position='top'][alignment='end']) .tooltip {
    right: 0;
  }

  :host([position='top'][alignment='end']) .tooltip::after {
    right: var(--size-24);
  }

  /* Left */

  :host([position='left']) .tooltip {
    right: calc(100% + var(--size-10));
  }

  :host([position='left']) .tooltip::after {
    left: 100%;
    border-color: transparent transparent transparent var(--surface-action-hover);
  }

  :host([position='left'][alignment='start']) .tooltip {
    top: 0;
  }

  :host([position='left'][alignment='start']) .tooltip::after {
    top: var(--size-24);
  }

  :host([position='left'][alignment='center']) .tooltip {
    top: 50%;
    transform: translateY(-50%);
  }

  :host([position='left'][alignment='center']) .tooltip::after {
    top: 50%;
    transform: translateY(-50%);
  }

  :host([position='left'][alignment='end']) .tooltip {
    bottom: 0;
  }

  :host([position='left'][alignment='end']) .tooltip::after {
    bottom: var(--size-24);
  }
`;
