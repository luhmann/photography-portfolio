import React from 'react';
import PropTypes from 'prop-types';
import { always, not, ifElse } from 'rambda';
import { withStateHandlers } from 'recompose';
import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';
import { media } from '../../theme';

import { StyledLink } from '../';

const Nav = styled.a`
  color: ${themeGet('colors.black')};
  cursor: pointer;
  display: block;
  font-family: ${themeGet('fonts.headline')};
  font-size: ${themeGet('fontSizes.xl')};
  font-weight: bold;
  min-width: 50px;
  position: relative;
  z-index: ${themeGet('zIndex.low')};

  &:hover {
    color: ${themeGet('colors.red.dark')};
  }
`;

const MenuContainer = styled.nav`
  position: absolute;
  right: ${themeGet('space.containerBorder')};
  padding-top: ${themeGet('space.2')};
  padding-right: ${themeGet('space.4')};
  text-align: right;
  top: ${themeGet('space.containerBorder')};
  z-index: ${themeGet('zIndex.high')};

  ${props =>
    props.open &&
    css`
      padding-right: ${themeGet('space.5')};
    `};

  ${media.sm`
    left: ${themeGet('space.containerBorderMobile')};
    right: ${themeGet('space.containerBorderMobile')};
    padding-right: ${themeGet('space.3')};
  `};
`;

const MenuSlideout = styled.nav`
  background-color: ${themeGet('colors.white')};
  right: calc(-1 * (50vw + ${themeGet('space.containerBorder')}));
  width: 50vw;
  height: calc(
    100vh - ${themeGet('space.containerBorder')} -
      ${themeGet('space.containerBorder')}
  );
  transition: 0.5s right;
  padding: ${themeGet('space.7')} ${themeGet('space.5')};
  position: absolute;
  top: 0;

  ${props =>
    props.visible &&
    css`
      right: 0;
    `};
`;

const Album = styled.div`
  color: ${themeGet('colors.black')};
  font-family: ${themeGet('fonts.headline')};
  font-size: ${themeGet('fontSizes.5xl')};
  margin-bottom: ${themeGet('space.2')};
`;

const Menu = ({ toggle, isOpen, albums }) => (
  <MenuContainer open={isOpen}>
    <Nav onClick={toggle}>{isOpen ? 'x' : 'menu'}</Nav>
    <MenuSlideout visible={isOpen}>
      {albums.map(album => (
        <React.Fragment key={album.albumTitle}>
          <Album>{album.albumTitle}</Album>
          {album.galleries.map((gallery, index) => (
            <StyledLink
              key={gallery.path}
              to={gallery.path}
              color="black"
              fontFamily="body"
              fontSize="xl"
              fontWeight="bold"
              display="block"
              mb={ifElse(
                () => index === album.galleries.length - 1,
                always(4),
                always(1)
              )()}
              onClick={toggle}
            >
              {gallery.title}
            </StyledLink>
          ))}
        </React.Fragment>
      ))}
    </MenuSlideout>
  </MenuContainer>
);

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      albumTitle: PropTypes.string.isRequired,
      galleries: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default withStateHandlers(
  ({ initialIsOpen = false }) => ({
    isOpen: initialIsOpen,
  }),
  { toggle: ({ isOpen }) => () => ({ isOpen: not(isOpen) }) }
)(Menu);
