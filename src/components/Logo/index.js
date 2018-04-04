import styled from 'styled-components';
import { color, fontFamily, fontSize, space, themeGet } from 'styled-system';

const Logo = styled.h1`
  ${color};
  ${space};
  ${fontFamily};
  ${fontSize};
  font-weight: 200;
  position: absolute;
  top: ${themeGet('space.2')}px;
  left: ${themeGet('space.4')}px;
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
