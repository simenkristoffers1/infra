import { css } from 'lit';

export const markdownStyles = css`
  .markdown {
    color: var(--text-body);
    font-size: var(--font-size-md);
    line-height: var(--lineheight-md);
    letter-spacing: var(--tracking-md);
    font-weight: var(--font-weight-regular);

    overflow-x: hidden;
    overflow-wrap: break-word;
  }

  .markdown > pre {
    white-space: pre-wrap;
  }
  .markdown {
    color: var(--text-body);
  }
  .markdown :where(p) {
    margin-top: var(--size-16);
    margin-bottom: var(--size-16);
  }
  .markdown :where(a) {
    font-weight: var(--font-weight-semibold);
    color: var(--text-action);
    text-decoration: none;
  }
  .markdown :where(a:hover) {
    color: var(--text-action-hover);
  }
  .markdown :where(a:visited) {
    color: var(--text-link-visited);
  }
  .markdown :where(strong) {
    color: var(--text-headings);
    font-weight: var(--font-weight-semibold);
  }
  .markdown :where(a strong) {
    color: inherit;
  }
  .markdown :where(blockquote strong) {
    color: inherit;
  }
  .markdown :where(thead th strong) {
    color: inherit;
  }
  .markdown :where(ol) {
    list-style-type: decimal;
    margin-top: var(--size-16);
    margin-bottom: var(--size-16);
    padding-inline-start: var(--size-28);
  }
  .markdown :where(ol[type='A']) {
    list-style-type: upper-alpha;
  }
  .markdown :where(ol[type='a']) {
    list-style-type: lower-alpha;
  }
  .markdown :where(ol[type='A s']) {
    list-style-type: upper-alpha;
  }
  .markdown :where(ol[type='a s']) {
    list-style-type: lower-alpha;
  }
  .markdown :where(ol[type='I']) {
    list-style-type: upper-roman;
  }
  .markdown :where(ol[type='i']) {
    list-style-type: lower-roman;
  }
  .markdown :where(ol[type='I s']) {
    list-style-type: upper-roman;
  }
  .markdown :where(ol[type='i s']) {
    list-style-type: lower-roman;
  }
  .markdown :where(ol[type='1']) {
    list-style-type: decimal;
  }
  .markdown :where(ul) {
    list-style-type: disc;
    margin-top: var(--size-16);
    margin-bottom: var(--size-16);
    padding-inline-start: var(--size-28);
  }
  .markdown :where(ol > li)::marker {
    font-weight: var(--font-weight-medium);
    color: var(--text-body);
  }
  .markdown :where(ul > li)::marker {
    color: var(--text-body);
  }
  .markdown :where(dt) {
    color: var(--text-headings);
    font-weight: var(--font-weight-semibold);
    margin-top: var(--size-16);
  }
  .markdown :where(hr) {
    border-top: var(--border-width-sm) solid var(--border-primary);
    margin-top: var(--size-32);
    margin-bottom: var(--size-32);
  }
  .markdown :where(blockquote) {
    font-weight: var(--font-weight-medium);
    font-style: italic;
    color: var(--text-body);
    border-left: var(--border-width-lg) solid var(--border-primary);
    quotes: '“' '”' '‘' '’';
    margin-top: var(--size-24);
    margin-bottom: var(--size-24);
    padding-inline-start: var(--size-16);
    margin-inline-start: 0;
  }
  .markdown :where(blockquote p:first-of-type):before {
    content: open-quote;
  }
  .markdown :where(blockquote p:last-of-type):after {
    content: close-quote;
  }
  .markdown :where(h1) {
    color: var(--text-headings);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-2xl);
    line-height: var(--lineheight-2xl);
    letter-spacing: var(--tracking-2xl);
    margin-top: var(--size-16);
    margin-bottom: var(--size-16);
  }
  .markdown :where(h1 strong) {
    font-weight: var(--font-weight-bold);
    color: inherit;
  }
  .markdown :where(h2) {
    color: var(--text-headings);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xl);
    line-height: var(--lineheight-xl);
    letter-spacing: var(--tracking-xl);
    margin-top: var(--size-16);
    margin-bottom: var(--size-16);
  }
  .markdown :where(h2 strong) {
    font-weight: var(--font-weight-bold);
    color: inherit;
  }
  .markdown :where(h3) {
    color: var(--text-headings);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-lg);
    line-height: var(--lineheight-lg);
    letter-spacing: var(--tracking-lg);
    margin-top: var(--size-16);
    margin-bottom: var(--size-8);
  }
  .markdown :where(h3 strong) {
    font-weight: var(--font-weight-bold);
    color: inherit;
  }
  .markdown :where(h4) {
    color: var(--text-headings);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-md);
    line-height: var(--lineheight-md);
    letter-spacing: var(--tracking-md);
    margin-top: var(--size-16);
    margin-bottom: var(--size-8);
  }
  .markdown :where(h4 strong) {
    font-weight: var(--font-weight-bold);
    color: inherit;
  }
  .markdown :where(h5) {
    color: var(--text-headings);
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
    margin-top: var(--size-16);
    margin-bottom: var(--size-4);
  }
  .markdown :where(h5 strong) {
    font-weight: var(--font-weight-bold);
    color: inherit;
  }
  .markdown :where(h6) {
    color: var(--text-headings);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xs);
    line-height: var(--lineheight-xs);
    letter-spacing: var(--tracking-xs);
    margin-top: var(--size-16);
    margin-bottom: var(--size-0);
  }
  .markdown :where(h6 strong) {
    font-weight: var(--font-weight-bold);
    color: inherit;
  }
  .markdown :where(img) {
    object-fit: contain;
    object-position: center;
    width: 100%;
    margin-top: var(--size-16);
    margin-bottom: var(--size-16);
  }
  .markdown :where(picture) {
    display: block;
    margin-top: var(--size-16);
    margin-bottom: var(--size-16);
  }
  .markdown :where(video) {
    margin-top: var(--size-16);
    margin-bottom: var(--size-16);
  }
  .markdown :where(kbd) {
    font-weight: var(--font-weight-medium);
    font-family: inherit;
    color: var(--text-action);
    box-shadow:
      0 0 0 1px rgb(17 24 39 / 10%),
      0 3px rgb(17 24 39 / 10%);
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
    border-radius: var(--radius-default);
    padding-top: var(--size-4);
    padding-inline-end: var(--size-8);
    padding-bottom: var(--size-4);
    padding-inline-start: var(--size-8);
  }
  .markdown :where(code) {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
    color: var(--text-information);
    background-color: var(--surface-information);
    border-radius: var(--radius-default);
    padding: 2px var(--size-4);
  }
  .markdown :where(a code) {
    color: inherit;
  }
  .markdown :where(h1 code) {
    color: inherit;
  }
  .markdown :where(h2 code) {
    color: inherit;
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
  }
  .markdown :where(h3 code) {
    color: inherit;
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
  }
  .markdown :where(h4 code) {
    color: inherit;
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
  }
  .markdown :where(h5 code) {
    color: inherit;
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
  }
  .markdown :where(h6 code) {
    color: inherit;
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
  }
  .markdown :where(blockquote code) {
    color: inherit;
  }
  .markdown :where(thead th code) {
    color: inherit;
  }
  .markdown :where(pre) {
    color: var(--text-code);
    background-color: var(--surface-code);
    overflow-x: auto;
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
    margin-top: var(--size-16);
    margin-bottom: var(--size-16);
    border-radius: var(--radius-default);
    padding-top: var(--size-14);
    padding-inline-end: var(--size-20);
    padding-bottom: var(--size-14);
    padding-inline-start: var(--size-20);
  }
  .markdown :where(pre code) {
    background-color: transparent;
    border-width: 0;
    border-radius: 0;
    padding: 0;
    font-weight: inherit;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    font-family: inherit;
  }
  .markdown :where(pre code):before {
    content: none;
  }
  .markdown :where(pre code):after {
    content: none;
  }
  .markdown :where(table) {
    border-collapse: collapse;
    width: 100%;
    table-layout: auto;
    margin-top: var(--size-16);
    margin-bottom: var(--size-16);
    border-spacing: 0;
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
    display: block;
    overflow-x: auto;
  }
  .markdown :where(thead th) {
    color: var(--text-headings);
    font-weight: var(--font-weight-semibold);
    vertical-align: bottom;
    padding-inline-end: var(--size-8);
    padding-top: var(--size-8);
    padding-bottom: var(--size-8);
    padding-inline-start: var(--size-8);
  }
  .markdown :where(tbody tr:last-child) {
    border-bottom-width: 0;
  }
  .markdown :where(tbody td) {
    vertical-align: baseline;
  }
  .markdown :where(tfoot td) {
    vertical-align: top;
  }
  .markdown :where(th, td) {
    text-align: start;
    border: var(--border-width-sm) solid var(--border-primary);
  }
  .markdown :where(figure > *) {
    margin-top: 0;
    margin-bottom: 0;
  }
  .markdown :where(figcaption) {
    color: var(--text-body);
    font-size: var(--font-size-sm);
    line-height: var(--lineheight-sm);
    letter-spacing: var(--tracking-sm);
    margin-top: var(--size-14);
  }
  .markdown :where(picture > img) {
    margin-top: 0;
    margin-bottom: 0;
  }
  .markdown :where(li) {
    margin-top: var(--size-8);
    margin-bottom: var(--size-8);
  }
  .markdown :where(ol > li) {
    padding-inline-start: var(--size-8);
  }
  .markdown :where(ul > li) {
    padding-inline-start: var(--size-8);
  }
  .markdown :where(.markdown > ul > li p) {
    margin-top: var(--size-12);
    margin-bottom: var(--size-12);
  }
  .markdown :where(.markdown > ul > li > p:first-child) {
    margin-top: var(--size-16);
  }
  .markdown :where(.markdown > ul > li > p:last-child) {
    margin-bottom: var(--size-16);
  }
  .markdown :where(.markdown > ol > li > p:first-child) {
    margin-top: var(--size-16);
  }
  .markdown :where(.markdown > ol > li > p:last-child) {
    margin-bottom: var(--size-16);
  }
  .markdown :where(ul ul, ul ol, ol ul, ol ol) {
    margin-top: var(--size-12);
    margin-bottom: var(--size-12);
  }
  .markdown :where(dl) {
    margin-top: var(--size-16);
    margin-bottom: var(--size-16);
  }
  .markdown :where(dd) {
    margin-top: var(--size-8);
    padding-inline-start: var(--size-28);
  }
  .markdown :where(hr + *) {
    margin-top: 0;
  }
  .markdown :where(h2 + *) {
    margin-top: 0;
  }
  .markdown :where(h3 + *) {
    margin-top: 0;
  }
  .markdown :where(h4 + *) {
    margin-top: 0;
  }
  .markdown :where(h5 + *) {
    margin-top: 0;
  }
  .markdown :where(h6 + *) {
    margin-top: 0;
  }
  .markdown :where(tbody td, tfoot td) {
    padding-top: var(--size-8);
    padding-inline-end: var(--size-8);
    padding-bottom: var(--size-8);
    padding-inline-start: var(--size-8);
  }
  .markdown :where(figure) {
    margin-top: var(--size-16);
    margin-bottom: var(--size-16);
  }
  .markdown :where(.markdown > :first-child) {
    margin-top: 0;
  }
  .markdown :where(.markdown > :last-child) {
    margin-bottom: 0;
  }
`;
