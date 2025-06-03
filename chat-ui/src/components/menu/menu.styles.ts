import { css } from 'lit';

export const menuStyles = css`
  .menu {
    display: inline-flex;
    position: relative;
  }

  .menu__button {
    display: inline-flex;
    border-radius: var(--radius-default);
  }

  .menu__button.active {
    outline: var(--border-width-md) solid var(--border-focus);
  }

  .menu__content {
    display: none;
  }

  .menu__content.open {
    display: block;
    width: 206px;
    position: absolute;
    z-index: 1000;
    transform: translateY(var(--border-width-md)) translateX(var(--border-width-md));
    /* padding: var(--size-4) var(--size-0) var(--size-4) var(--size-8); */
    top: 100%;
    right: 0;
    background-color: var(--surface-primary);
    border: var(--border-width-sm) solid var(--border-primary);
    border-radius: var(--radius-default);
    box-shadow:
      -2px 0px 5px 0px #1334451a,
      -8px 0px 8px 0px #13344517,
      -19px 0px 11px 0px #1334450d,
      -34px 0px 14px 0px #13344503,
      -53px 0px 15px 0px #13344500;
  }
`;
