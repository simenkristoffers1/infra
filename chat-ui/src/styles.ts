import { css } from 'lit';

export const globalStyles = css`
  :host,
  :root {
    --font-family-base: 'Inter', sans-serif;
    --font-size-xs: 11px;
    --font-size-sm: 12px;
    --font-size-md: 14px;
    --font-size-lg: 16px;
    --font-size-xl: 20px;
    --font-size-2xl: 24px;
    --font-size-3xl: 36px;

    --font-size-body-sm: var(--font-size-sm);
    --font-size-body-md: var(--font-size-md);
    --font-size-body-lg: var(--font-size-lg);

    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;

    --lineheight-xs: var(--size-16);
    --lineheight-sm: var(--size-20);
    --lineheight-md: var(--size-20);
    --lineheight-lg: var(--size-24);
    --lineheight-xl: var(--size-32);
    --lineheight-2xl: var(--size-36);
    --lineheight-3xl: var(--size-56);

    --tracking-xs: 0.08px;
    --tracking-sm: 0px;
    --tracking-md: -0.096px;
    --tracking-lg: -0.176px;
    --tracking-xl: -0.272px;
    --tracking-2xl: -0.304px;
    --tracking-3xl: -0.352px;

    --color-primary-70: #2a6480;
    --color-primary-90: #133445;
    --color-secondary-default: #fae0ce;
    --color-neutral-10: #f2f3f5;
    --color-neutral-20: #e2e4e9;

    --text-headings: #133445;
    --text-body: #133445;
    --text-action: #1f4e66;
    --text-action-hover: #133445;
    --text-disabled: #b9b9b9;
    --text-information: #133445;
    --text-on-action: #fcf0e7;
    --text-link-visited: #591ab5;
    --text-disable-selected: #6f7687;
    --text-on-disabled: #6f7687;
    --text-code: #e5e7eb;

    --surface-primary: #ffffff;
    --surface-page: #f2f3f5;
    --surface-disabled: #e2e4e9;
    --surface-information: #edf4fe;
    --surface-action: #1f4e66;
    --surface-action-hover: #133445;
    --surface-action-hover-2: #fae0ce;
    --surface-code: #1f2937;

    --border-primary: #cccfd7;
    --border-disabled: #cccfd7;
    --border-action: #1f4e66;
    --border-action-hover: #377ea0;
    --border-action-hover-2: #f5c3a1;
    --border-focus: #1f4e66;

    --icon-primary: #133445;
    --icon-success: #448548;
    --icon-error: #cc453e;
    --icon-on-disabled: #6f7687;
    --icon-on-action: #fae0ce;
    --icon-action: #1f4e66;
    --icon-action-hover: #377ea0;
    --icon-disabled: #cccfd7;

    --border-width-none: 0px;
    --border-width-sm: 1px;
    --border-width-md: 2px;
    --border-width-lg: 4px;

    --radius-round: 100%;
    --radius-default: 4px;
    --radius-sharp: 0.28px;

    --size-0: 0px;
    --size-2: 2px;
    --size-4: 4px;
    --size-6: 6px;
    --size-8: 8px;
    --size-10: 10px;
    --size-12: 12px;
    --size-14: 14px;
    --size-16: 16px;
    --size-20: 20px;
    --size-24: 24px;
    --size-28: 28px;
    --size-30: 30px;
    --size-32: 32px;
    --size-36: 36px;
    --size-40: 40px;
    --size-48: 48px;
    --size-56: 56px;
    --size-64: 64px;

    font-family: var(--font-family-base);
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-md);
    line-height: var(--lineheight-md);
    letter-spacing: var(--tracking-md);
  }
`;
