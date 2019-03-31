import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { useGesture } from 'react-with-gesture';
import { F } from 'rambda';
import debounce from 'lodash/debounce';
import cond from 'lodash/cond';

import { Background, Logo, Menu, StyledLink, RootPageStyle } from 'components/';
import { mapAllGalleriesGraphQLResponse } from 'utils/mappings';
import { albumInfoType, locationType } from 'utils/types';

import theme from '../../theme';

const Header = ({ albums }) => (
  <>
    <StyledLink to="/" color="black">
      <Logo />
    </StyledLink>
    <Menu albums={albums} />
  </>
);

Header.propTypes = {
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

const handleGesture = debounce(
  cond([
    [() => Boolean(window.navigator.standalone) === false, F],
    [({ delta: [deltaX] }) => Math.abs(deltaX) < 100, F],
    [
      ({ initial: [initialX], delta: [deltaX] }) => initialX < 50 && deltaX > 0,
      () => window.history.back(),
    ],
    [
      ({ initial: [initialX], delta: [deltaX] }) =>
        initialX > window.innerWidth - 50 && deltaX < 0,
      () => window.history.forward(),
    ],
  ]),
  50
);

export const LayoutComponent = ({ children, albums, location }) => {
  const bind = useGesture({
    touch: true,
    mouse: false,
    onAction: handleGesture,
  });

  // console.log({ delta, direction, distance, xy, initial, local });
  return (
    <ThemeProvider theme={theme}>
      {/* NOTE: Fragment is important here otherwise the context-provider complains about multiple children */}
      <>
        {/* TODO: convoluted helmet-syntax due to this bug https://github.com/nfl/react-helmet/issues/373 */}
        <Helmet
          title="J F Dietrich Photography"
          meta={[
            {
              name: 'description',
              content:
                'Photographs by Jan Florian Dietrich from Berlin, Germany',
            },
            {
              name: 'viewport',
              content:
                'width=device-width, initial-scale=1, shrink-to-fit=no,maximum-scale=1',
            },
          ]}
          link={[
            {
              rel: 'stylesheet',
              href:
                'https://fonts.googleapis.com/css?family=Lora:700|Patua+One',
            },
          ]}
        />
        <RootPageStyle />
        <Background {...bind()}>
          {location.pathname === '/' ? null : <Header albums={albums} />}
          {children}
        </Background>
      </>
    </ThemeProvider>
  );
};

LayoutComponent.propTypes = {
  children: PropTypes.node.isRequired,
  albums: PropTypes.arrayOf(albumInfoType).isRequired,
  location: locationType.isRequired,
};

LayoutComponent.displayName = 'LayoutComponent';

const pageQuery = graphql`
  query GalleriesQuery {
    ...AllGalleriesYamlFragment
  }
`;

const Layout = ({ children, location }) => (
  <StaticQuery
    query={pageQuery}
    render={data => (
      <LayoutComponent
        albums={mapAllGalleriesGraphQLResponse(data)}
        location={location}
      >
        {children}
      </LayoutComponent>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: locationType.isRequired,
};

export default Layout;
