import { css } from 'lit';

export const cardContentStyles = css`
  :host {
    overflow: hidden;
    display: flex;
    flex: 1 1 0;
    padding: var(--size-8) var(--size-4);
    background-color: var(--surface-primary);
  }

  @supports selector(::-webkit-scrollbar) {
    .scroller::-webkit-scrollbar-thumb {
      background: var(--icon-disabled);
      border-radius: var(--radius-default);
      cursor: pointer;
    }
    .scroller::-webkit-scrollbar-track {
      background: var(--surface-page);
    }
    .scroller::-webkit-scrollbar-thumb:hover {
      background: var(--icon-on-disabled);
    }
    .scroller::-webkit-scrollbar {
      max-width: var(--size-4);
      max-height: var(--size-4);
    }
  }

  .scroller {
    width: 100%;
    height: 100%;
    position: relative;

    &:has(.content) {
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .content {
      padding-right: var(--size-8);
      *:first-child {
        margin-top: 0;
      }
      *:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
