import { css } from 'lit';

export const popoverStyles = css`
  :host {
    display: none;
    box-sizing: border-box;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: var(--surface-primary);
    border: var(--border-width-sm) solid var(--color-neutral-20);
    box-shadow:
      -2px 0px 5px 0px #1334451a,
      -8px 0px 8px 0px #13344517,
      -19px 0px 11px 0px #1334450d,
      -34px 0px 14px 0px #13344503,
      -53px 0px 15px 0px #13344500;
  }

  :host([open]) {
    display: flex;
  }

  :host::before {
    content: '';
    position: absolute;
    top: 0;
    right: 20%;
    transform: translateY(-100%);
    border-width: var(--size-10);
    border-style: solid;
    border-color: transparent transparent rgba(19, 52, 69, 0.15) transparent;
    z-index: -10;
    filter: blur(1.5px);
  }

  :host::after {
    content: '';
    position: absolute;
    box-sizing: border-box;
    border-width: var(--size-8);
    border-style: solid;
    border-color: transparent transparent var(--surface-primary) transparent;
    top: 0;
    right: 20%;
    transform: translateY(-100%);
    z-index: 0;
  }
`;
