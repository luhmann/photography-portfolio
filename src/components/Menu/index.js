import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { always, not, ifElse, pipe, tap } from 'rambda';
import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';

import { albumInfoType } from 'utils/types';

import { mediaInput, mediaScreen } from '../../theme';
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

  ${mediaInput.mouse`
    &:hover {
      color: ${themeGet('colors.red.dark')};
    }
  `};

  ${props =>
    props.open &&
    css`
      padding-right: ${themeGet('space.5')};
    `};

  ${mediaScreen.md`
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
  transition: right 0.5s ease-in-out, opacity 0.5s ease-in-out;
  width: 50vw;
  opacity: 0;
  z-index: ${themeGet('zIndex.middle')};

  ${props =>
    props.visible &&
    css`
      right: ${themeGet('space.containerBorder')};
      opacity: 1;
    `};

  ${mediaScreen.md`
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
    transition: top 0.5s ease-in-out, opacity 0.5s ease-in-out;
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

  ${mediaScreen.md`
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

const Menu = ({ albums }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = pipe(
    () => not(isOpen),
    tap(setIsOpen)
  );

  useEffect(() => {
    controlBodyScroll({ isOpen, menuSlideoutRef });
  });

  return (
    <>
      <Nav open={isOpen} onClick={toggle}>
        {isOpen ? 'x' : 'menu'}
      </Nav>
      <MenuSlideout
        ref={menuSlideoutRef}
        data-testid="menu-slideout"
        visible={isOpen}
      >
        {/* <StyledLink
        to="/"
        color="black"
        fontFamily="body"
        fontSize={['m', 'l']}
        fontWeight="bold"
        display="block"
        mb={2}
      >
        Home
      </StyledLink> */}
        {albums.map(album => (
          <React.Fragment key={album.albumTitle}>
            <Album data-testid="menu-album">{album.albumTitle}</Album>
            {album.galleries.map((gallery, index) => (
              <StyledLink
                key={gallery.path}
                to={gallery.path}
                color="black"
                data-testid="menu-gallery"
                fontFamily="body"
                fontSize={['m', 'l']}
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
    </>
  );
};

Menu.propTypes = {
  albums: PropTypes.arrayOf(albumInfoType).isRequired,
};

export default Menu;
