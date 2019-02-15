import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

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

export const LayoutComponent = ({ children, albums, location }) => (
  <ThemeProvider theme={theme}>
    {/* NOTE: Fragment is important here otherwise the context-provider complains about multiple children */}
    <>
      {/* TODO: convoluted helmet-syntax due to this bug https://github.com/nfl/react-helmet/issues/373 */}
      <Helmet
        title="J F Dietrich Photography"
        meta={[
          {
            name: 'description',
            content: 'Photography by Jan Florian Dietrich from Berlin, Germany',
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
            href: 'https://fonts.googleapis.com/css?family=Lora:700|Patua+One',
          },
        ]}
      />
      <RootPageStyle />
      <Background>
        {location.pathname === '/' ? null : <Header albums={albums} />}
        {children}
      </Background>
    </>
  </ThemeProvider>
);

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
