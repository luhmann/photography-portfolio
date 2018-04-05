import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { mapProps } from 'recompose';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

import { Background, Logo, Menu, StyledLink } from '../components/';
import { mapAllGalleriesGraphQLResponse } from '../utils/mappings';
import './index.css';

const Header = ({ albums }) => (
  <React.Fragment>
    <StyledLink to="/" color="black">
      <Logo m={0}>JF Dietrich Photography</Logo>
    </StyledLink>
    <Menu albums={albums} />
  </React.Fragment>
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

const Layout = ({ children, albums, location }) => (
  <ThemeProvider theme={theme}>
    <div>
      <Helmet>
        <title>J F Dietrich Photography</title>
        <link
          href="https://fonts.googleapis.com/css?family=Lora:700|Patua+One"
          rel="stylesheet"
        />
      </Helmet>
      <Background bg="black">
        {location.pathname === '/' ? null : <Header albums={albums} />}
        {children()}
      </Background>
    </div>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.func.isRequired,
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
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

Layout.displayName = 'Layout';

export default mapProps(props => ({
  albums: mapAllGalleriesGraphQLResponse(props),
  location: props.location,
  children: props.children,
}))(Layout);

export const pageQuery = graphql`
  query GalleriesQuery {
    ...allGalleriesYamlFragment
  }
`;
