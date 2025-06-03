import { css } from 'lit';

export const loaderStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-regular);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
    color: var(--text-body);
    gap: var(--size-4);
  }

  :host([alignment='right']) {
    flex-direction: row-reverse;
  }

  .loader-text {
    box-sizing: border-box;
  }

  /**
   * Spinner Animation
   */

  :host([type='spinner']) .loader {
    width: var(--size-16);
    height: var(--size-16);
    border-style: solid;
    border-color: var(--color-secondary-default);
    border-top-color: var(--color-primary-70);
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    animation: spin 1.2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /**
   * Typing Animation
   */

  :host([type='typing']) {
    --typing-dot-size: 8px;
    --typing-dot-padding: 4px;
    --typing-dot-highlight-color: var(--icon-primary);
    --typing-dot-color: var(--surface-disabled);
  }

  :host([type='typing']) .loader {
    width: var(--typing-dot-size);
    height: var(--typing-dot-size);
    transform: translateX(calc(var(--typing-dot-size) + var(--typing-dot-padding)));
    border-radius: 50%;
    margin-right: calc((var(--typing-dot-size) + var(--typing-dot-padding)) * 2);
    display: block;
    position: relative;
    background: var(--typing-dot-color);
    box-shadow:
      calc((var(--typing-dot-size) + var(--typing-dot-padding)) * -1) 0 var(--typing-dot-color),
      calc(var(--typing-dot-size) + var(--typing-dot-padding)) 0 var(--typing-dot-color);
    animation: typing 3s linear infinite;
  }

  @keyframes typing {
    33% {
      background: var(--typing-dot-color);
      box-shadow:
        calc((var(--typing-dot-size) + var(--typing-dot-padding)) * -1) 0
          var(--typing-dot-highlight-color),
        calc(var(--typing-dot-size) + var(--typing-dot-padding)) 0 var(--typing-dot-color);
    }
    66% {
      background: var(--typing-dot-highlight-color);
      box-shadow:
        calc((var(--typing-dot-size) + var(--typing-dot-padding)) * -1) 0 var(--typing-dot-color),
        calc(var(--typing-dot-size) + var(--typing-dot-padding)) 0 var(--typing-dot-color);
    }
    100% {
      background: var(--typing-dot-color);
      box-shadow:
        calc((var(--typing-dot-size) + var(--typing-dot-padding)) * -1) 0 var(--typing-dot-color),
        calc(var(--typing-dot-size) + var(--typing-dot-padding)) 0 var(--typing-dot-highlight-color);
    }
  }

  /**
   * Thinking Animation
   */

  :host([type='thinking']) {
    --thinking-dot-size: 24px;
    --thinking-dot-color: var(--icon-primary);
  }

  :host([type='thinking']) .loader {
    width: var(--thinking-dot-size);
    height: var(--thinking-dot-size);
    display: inline-block;
    position: relative;
  }

  :host([type='thinking']) .loader::after,
  :host([type='thinking']) .loader::before {
    content: '';
    box-sizing: border-box;
    width: var(--thinking-dot-size);
    height: var(--thinking-dot-size);
    border-radius: 50%;
    background: var(--thinking-dot-color);
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    animation: thinking 1500ms linear infinite;
  }
  :host([type='thinking']) .loader::after {
    animation-delay: 750ms;
  }

  @keyframes thinking {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;
