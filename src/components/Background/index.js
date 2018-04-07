import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { media } from '../../theme';

const Background = styled.main`
  background-color: ${themeGet('colors.black')};
  height: 100vh;
  padding: ${themeGet('space.containerBorder')};

  ${media.sm`
    height: auto;
    min-height: 100vh;
    padding: ${themeGet('space.containerBorderMobile')};
   `};
`;

Background.propTypes = {};

Background.displayName = 'Background';

export default Background;
