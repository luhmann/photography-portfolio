import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { media } from '../../theme';

const ContentContainer = styled.div`
  background-color: ${themeGet('colors.white')};
  height: 100%;

  ${media.sm`
    min-height: calc(100% - ${themeGet('space.containerBorderMobile')});
  `};
`;

export default ContentContainer;
