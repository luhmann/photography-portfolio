import styled from 'styled-components';
import { color, space } from 'styled-system';

const Background = styled.main`
  ${color};
  ${space};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
`;

Background.propTypes = {
  ...color.propTypes,
  ...space.propTypes,
};

Background.displayName = 'Background';

export default Background;
