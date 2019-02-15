import styled from 'styled-components';
import { themeGet } from 'styled-system';

import { mediaScreen } from '../../theme';

const Background = styled.main`
  background-color: ${themeGet('colors.black')};
  height: 100vh;
  padding: ${themeGet('space.containerBorder')};

  ${mediaScreen.md`
    height: auto;
    min-height: 100vh;
    padding: ${themeGet('space.containerBorderMobile')};
   `};
`;

Background.displayName = 'Background';

export default Background;
