import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { media } from '../../theme';

const Background = styled.main`
  background-color: ${themeGet('colors.black')};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;

  ${media.sm`overflow: auto;`};
`;

Background.propTypes = {};

Background.displayName = 'Background';

export default Background;
