import { adoptStyles, LitElement } from 'lit';

import { globalStyles } from '@/styles';

const StyleMixin = <T extends LitMixin>(Base: T): T =>
  class extends Base {
    override connectedCallback() {
      super.connectedCallback();
      if (this.shadowRoot) {
        adoptStyles(this.shadowRoot, [globalStyles, ...this.shadowRoot.adoptedStyleSheets]);
      }
    }
  };

export class BaseComponent extends StyleMixin(LitElement) {
  constructor() {
    super();
    const font = document.createElement('link');
    font.href =
      'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap';
    font.rel = 'stylesheet';
    document.head.appendChild(font);
  }
}
