import styled from 'styled-components';
import { color, space } from 'styled-system';

const Logo = styled.h1`
  ${color};
  ${space};
`;

Logo.propTypes = {
  ...color.propTypes,
  ...space.propTypes,
};

Logo.displayName = 'Logo';

export default Logo;
