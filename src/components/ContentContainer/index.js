import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { mediaScreen } from '../../theme';

const ContentContainer = styled.div`
  background-color: ${themeGet('colors.white')};
  height: 100%;

  ${mediaScreen.sm`
    min-height: calc(100% - ${themeGet('space.containerBorderMobile')});
  `};
`;

export default ContentContainer;
