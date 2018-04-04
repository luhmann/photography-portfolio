import styled from 'styled-components';
import Link from 'gatsby-link';
import { color, themeGet } from 'styled-system';

const StyledLink = styled(Link)`
  ${color};
  text-decoration: none;

  &:hover {
    color: ${themeGet('colors.grey.darkest')};
  }
`;

StyledLink.propTypes = {
  ...color.propTypes,
};

StyledLink.displayName = 'Logo';

export default StyledLink;
