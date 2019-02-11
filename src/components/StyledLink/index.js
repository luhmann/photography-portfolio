import styled from 'styled-components';
import { Link } from 'gatsby';
import {
  color,
  display,
  fontFamily,
  fontSize,
  fontWeight,
  space,
  themeGet,
} from 'styled-system';

import { mediaInput } from '../../theme';

const StyledLink = styled(Link)`
  ${color};
  ${fontFamily};
  ${fontSize};
  ${fontWeight};
  ${display};
  ${space};
  text-decoration: none;

  ${mediaInput.mouse`
    &:hover,
    &:hover > * {
      color: ${themeGet('colors.red.dark')};
    }
  `};
`;

StyledLink.propTypes = {
  ...color.propTypes,
  ...display.propTypes,
  ...fontFamily.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...space.propTypes,
};

StyledLink.displayName = 'StyledLink';

export default StyledLink;
