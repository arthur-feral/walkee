import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';

export const timingSimple = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';

export const transitionSimple = `.2s ${timingSimple}`;
export const transitionFast = `.1s ${timingSimple}`;

export const ResetGlobalStyle = createGlobalStyle`
  ${normalize}
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: white;
    color pink !important;
    height: 100vh;
  }

  * {
    box-sizing: border-box;
    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
`;

export const ellipsisText = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
`;

export const hidden = css`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
`;

export const buttonResetStyle = () => css`
  cursor: pointer;
  user-select: none;
  margin: 0;
  padding: 0;
  outline: 0;
  border: 0;
  width: auto;
  overflow: visible;
  display: flex;
  align-items: center;
  color: inherit;
  background-color: transparent;
  font-family: inherit;
  line-height: inherit;
`;

export const inputResetStyle = () => css`
  border:none;
  background-image:none;
  background-color:transparent;
  box-shadow: none;
  outline: none;
`;
