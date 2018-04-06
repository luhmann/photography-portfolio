import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { media } from '../../theme';

const ContentContainer = styled.div`
  background-color: ${themeGet('colors.white')};
  position: absolute;
  top: ${themeGet('space.containerBorder')};
  bottom: ${themeGet('space.containerBorder')};
  left: ${themeGet('space.containerBorder')};
  right: ${themeGet('space.containerBorder')};

  ${media.sm`
    top: ${themeGet('space.1')};
    bottom: ${themeGet('space.1')};
    left: ${themeGet('space.1')};
    right: ${themeGet('space.1')};
    min-height: calc(100% - ${themeGet('space.1')});
    bottom: auto;
    border-bottom: ${themeGet('space.1')} solid ${themeGet('colors.black')};
  `};
`;

export default ContentContainer;
