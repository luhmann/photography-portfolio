import styled from 'styled-components';
import Link from 'gatsby-link';
import { color, themeGet } from 'styled-system';

const StyledLink = styled(Link)`
  ${color};
  text-decoration: none;

  &:hover,
  &:hover > * {
    color: ${themeGet('colors.grey.darkest')};
  }
`;

StyledLink.propTypes = {
  ...color.propTypes,
};

StyledLink.displayName = 'StyledLink';

export default StyledLink;
