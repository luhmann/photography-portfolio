import React from 'react';
import styled from 'styled-components';
import { space, color, themeGet } from 'styled-system';

const LogoStyle = styled.h1`
  ${color};
  font-family: ${themeGet('fonts.logo')};
  font-size: ${themeGet('fontSizes.xl')};
  font-weight: ${themeGet('fontWeights.bold')};
  position: absolute;
  top: ${themeGet('space.3')};
  left: ${themeGet('space.4')};
  margin: ${themeGet('space.0')};
  z-index: ${themeGet('zIndex.high')};
  ${space};
`;

const Logo = props => <LogoStyle {...props}>JF Dietrich Photography</LogoStyle>;

Logo.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
};

Logo.displayName = 'Logo';

export default Logo;
