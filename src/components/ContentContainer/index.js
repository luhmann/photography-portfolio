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
    top: ${themeGet('space.containerBorderMobile')};
    bottom: ${themeGet('space.containerBorderMobile')};
    left: ${themeGet('space.containerBorderMobile')};
    right: ${themeGet('space.containerBorderMobile')};
    min-height: calc(100% - ${themeGet('space.containerBorderMobile')});
    bottom: auto;
    border-bottom: ${themeGet('space.containerBorderMobile')} solid ${themeGet(
    'colors.black'
  )};
  `};
`;

export default ContentContainer;
