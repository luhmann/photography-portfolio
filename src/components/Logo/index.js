import styled from 'styled-components';
import { color, fontFamily, fontSize, space, themeGet } from 'styled-system';

const Logo = styled.h1`
  ${color};
  ${space};
  ${fontFamily};
  ${fontSize};
  position: absolute;
  top: ${themeGet('space.3')}px;
  left: ${themeGet('space.3')}px;
  z-index: ${themeGet('zIndex.high')};
`;

Logo.propTypes = {
  ...color.propTypes,
  ...fontFamily.propTypes,
  ...fontSize.propTypes,
  ...space.propTypes,
};

Logo.displayName = 'Logo';

export default Logo;
