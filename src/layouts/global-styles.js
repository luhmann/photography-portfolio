import { injectGlobal } from 'styled-components';
import { mediaScreen } from '../theme';

injectGlobal`
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
    `}
  }

  * {
    box-sizing: border-box;
  }
`;
