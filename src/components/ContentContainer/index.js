import styled from 'styled-components';
import { themeGet } from 'styled-system';

const ContentContainer = styled.div`
  background-color: ${themeGet('colors.white')};
  position: absolute;
  top: ${themeGet('space.containerBorder')};
  bottom: ${themeGet('space.containerBorder')};
  left: ${themeGet('space.containerBorder')};
  right: ${themeGet('space.containerBorder')};
`;

export default ContentContainer;
