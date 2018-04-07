import React from 'react';
import PropTypes from 'prop-types';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { always, not, ifElse } from 'rambda';
import { compose, lifecycle, withStateHandlers, withProps } from 'recompose';
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
  padding-right: ${themeGet('space.4')};
  padding-top: ${themeGet('space.2')};
  position: absolute;
  right: ${themeGet('space.containerBorder')};
  text-align: right;
  top: ${themeGet('space.containerBorder')};
  z-index: ${themeGet('zIndex.high')};

  &:hover {
    color: ${themeGet('colors.red.dark')};
  }

  ${props =>
    props.open &&
    css`
      padding-right: ${themeGet('space.5')};
    `};

  ${media.sm`
    right: ${themeGet('space.containerBorderMobile')};
    padding-right: ${themeGet('space.3')};
  `};
`;

// TODO: this is doing too much, split into two components for phone and rest
const MenuSlideout = styled.nav`
  background-color: ${themeGet('colors.white')};
  height: calc(
    100vh - ${themeGet('space.containerBorder')} -
      ${themeGet('space.containerBorder')}
  );
  padding: ${themeGet('space.7')} ${themeGet('space.5')};
  position: absolute;
  right: -50vw;
  text-align: right;
  top: ${themeGet('space.containerBorder')};
  transition: right 0.5s ease-in-out;
  width: 50vw;
  z-index: ${themeGet('zIndex.middle')};

  ${props =>
    props.visible &&
    css`
      right: ${themeGet('space.containerBorder')};
    `};

  ${media.sm`
    border-bottom: ${themeGet('space.containerBorderMobile')} solid ${themeGet(
    'colors.black'
  )};
    min-height: calc(
      100vh - ${themeGet('space.containerBorderMobile')});
    left: ${themeGet('space.containerBorderMobile')};
    width: calc(100vw - ${themeGet('space.containerBorderMobile')} - ${themeGet(
    'space.containerBorderMobile'
  )});
    padding: ${themeGet('space.4')} ${themeGet('space.4')};
    top: -100vh;
    transition: top 0.5s ease-in-out;
    text-align: left;

    ${props =>
      props.visible &&
      css`
        top: ${themeGet('space.containerBorderMobile')};
      `};
  `};
`;

const Album = styled.div`
  color: ${themeGet('colors.black')};
  font-family: ${themeGet('fonts.headline')};
  font-size: ${themeGet('fontSizes.5xl')};
  margin-bottom: ${themeGet('space.2')};

  ${media.sm`
    font-size: ${themeGet('fontSizes.3xl')};
    margin-bottom: ${themeGet('space.2')};
  `};
`;

const menuSlideoutRef = React.createRef();
const controlBodyScroll = ifElse(
  ({ isOpen, menuSlideoutRef }) => menuSlideoutRef.current && isOpen,
  ({ menuSlideoutRef }) => disableBodyScroll(menuSlideoutRef.current),
  () => clearAllBodyScrollLocks()
);

const Menu = ({ toggle, isOpen, albums, menuSlideoutRef }) => (
  <React.Fragment>
    <Nav onClick={toggle} open={isOpen}>
      {isOpen ? 'x' : 'menu'}
    </Nav>
    <MenuSlideout innerRef={menuSlideoutRef} visible={isOpen}>
      {albums.map(album => (
        <React.Fragment key={album.albumTitle}>
          <Album>{album.albumTitle}</Album>
          {album.galleries.map((gallery, index) => (
            <StyledLink
              key={gallery.path}
              to={gallery.path}
              color="black"
              fontFamily="body"
              fontSize={['l', 'xl']}
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
  </React.Fragment>
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
  menuSlideoutRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLElement),
  }).isRequired,
};

export default compose(
  withStateHandlers(
    ({ initialIsOpen = false }) => ({
      isOpen: initialIsOpen,
    }),
    {
      toggle: ({ isOpen }) => () => ({ isOpen: not(isOpen) }),
    }
  ),
  withProps({
    menuSlideoutRef,
  })
  // lifecycle({
  //   componentDidUpdate() {
  //     const { isOpen, menuSlideoutRef } = this.props;
  //     controlBodyScroll({ isOpen, menuSlideoutRef });
  //   },
  // })
)(Menu);
