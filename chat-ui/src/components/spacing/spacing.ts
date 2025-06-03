import classnames from 'classnames';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { spacingStyles } from './spacing.styles';

@customElement('gaia-spacing')
export class Spacing extends LitElement {
  static styles = [spacingStyles];

  @property({ type: String })
  direction: 'vertical' | 'horizontal' = 'horizontal';

  render() {
    return html`
      <div
        class="spacing ${classnames({
          'spacing--vertical': this.direction === 'vertical',
          'spacing--horizontal': this.direction === 'horizontal',
        })}"
      ></div>
    `;
  }
}
