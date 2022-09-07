import { css } from 'styled-components';

export const fontTypography = css`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  font-stretch: 400;
`;

/**
 * Typography style for the main title on tool pages.
 */
export const headingLargeTypography = css`
  ${fontTypography}

  font-weight: 700;
  font-size: 26px;
  line-height: 36px;
`;

/**
 * Typography style for the main title on tool pages.
 */
export const headingSmallTypography = css`
  ${fontTypography}

  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
`;

/**
 * Typography style for UI elements, baseline text, short paragraphs.
 */
export const bodySmallRegularTypography = css`
  ${fontTypography}

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

/**
 * Typography style for UI elements, small, short text.
 */
export const bodySmallBoldTypography = css`
  ${fontTypography}

  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`;


/**
 * Typography style for small and short text, notes.
 */
export const captionTypography = css`
  ${fontTypography}

  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;
