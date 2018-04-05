import styled from 'styled-components';
import { space, themeGet } from 'styled-system';

const Logo = styled.h1`
  ${space};
  color: ${themeGet('colors.black')};
  font-family: ${themeGet('fonts.logo')};
  font-size: ${themeGet('fontSizes.xl')};
  font-weight: ${themeGet('fontWeights.bold')};
  position: absolute;
  top: ${themeGet('space.3')};
  left: ${themeGet('space.4')};
  z-index: ${themeGet('zIndex.high')};
`;

Logo.propTypes = {
  ...space.propTypes,
};

Logo.displayName = 'Logo';

export default Logo;
