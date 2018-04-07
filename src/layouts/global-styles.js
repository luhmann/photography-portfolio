import { injectGlobal } from 'styled-components';
import { media } from '../theme';

injectGlobal`
  body,
  html {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    ${media.sm`
      height: auto;
      overflow: auto;
    `}
  }

  * {
    box-sizing: border-box;
  }

  /* TODO: find more localized solution */
  .gatsby-image-outer-wrapper {
    width: 100%;
    height: 100%;
  }
`;
