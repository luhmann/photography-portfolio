import React from 'react';
import PropTypes from 'prop-types';
import { pathOr, pipe } from 'rambda';
import { Helmet } from 'react-helmet';
import { mapProps } from 'recompose';
import styled, { ThemeProvider } from 'styled-components';
import { themeGet } from 'styled-system';
import theme from '../theme';

import { Background, Logo, Menu, StyledLink } from '../components/';
import './index.css';

const Content = styled.div`
  background-color: ${themeGet('colors.white')};
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  right: 6px;
  padding: ${themeGet('space.6')};
`;

const Layout = ({ children, albums }) => {
  console.log(albums);
  return (
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
          <Content>
            <StyledLink to="/" color="black">
              <Logo m={0}>JF Dietrich Photography</Logo>
            </StyledLink>
            <Menu albums={albums} />
            {children()}
          </Content>
        </Background>
      </div>
    </ThemeProvider>
  );
};

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
};

Layout.displayName = 'Layout';

const mapGalleriesGraphQLResponse = response =>
  response.map(({ fieldValue: albumTitle, edges: galleries }) => ({
    albumTitle,
    galleries: galleries.map(gallery => gallery.node),
  }));

export default mapProps(props => ({
  albums: pipe(
    pathOr([], 'data.allGalleriesYaml.group'),
    mapGalleriesGraphQLResponse
  )(props),
  children: props.children,
}))(Layout);

// Disabling eslint linting for graphql-global but only here
/* eslint-disable-next-line */
export const pageQuery = graphql`
  query GalleriesQuery {
    allGalleriesYaml {
      group(field: album) {
        fieldValue
        edges {
          node {
            title
            path
          }
        }
      }
    }
  }
`;
