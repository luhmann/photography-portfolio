import React from 'react';
import styled from 'styled-components';
import { space, color, themeGet } from 'styled-system';
import { mediaScreen } from '../../theme';

const LogoStyle = styled.h1`
  ${color};
  font-family: ${themeGet('fonts.logo')};
  font-size: ${themeGet('fontSizes.xl')};
  font-weight: ${themeGet('fontWeights.bold')};
  position: absolute;
  top: calc(${themeGet('space.containerBorder')} + ${themeGet('space.2')});
  left: calc(${themeGet('space.containerBorder')} + ${themeGet('space.4')});
  margin: ${themeGet('space.0')};
  z-index: ${themeGet('zIndex.middle')};
  ${space};

  ${mediaScreen.md`
    /* NOTE: Saving the calc (= containerBorderMobile + space.3) */
    left: ${themeGet('space.4')};
  `};
`;

const Logo = props => <LogoStyle {...props}>JF Dietrich Photography</LogoStyle>;

Logo.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
};

Logo.displayName = 'Logo';

export default Logo;
