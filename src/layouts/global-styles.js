import { injectGlobal } from 'styled-components';
import { media } from '../theme';

injectGlobal`
  body,
  html {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    position: relative;

    ${media.sm`
      height: auto;
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
