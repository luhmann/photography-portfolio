import { createGlobalStyle } from 'styled-components';

import { mediaScreen } from '../theme';

export const RootPageStyle = createGlobalStyle`
  body,
  html {
    background-color: #22292F;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    ${mediaScreen.md`
      height: auto;
      overflow: auto;
      overflow-x: hidden;
    `}
  }

  * {
    box-sizing: border-box;
  }
`;
