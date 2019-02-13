import React from 'react';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import Img from 'gatsby-image';
import { Link, graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';

import { mapGalleryImagesGraphQLResponse } from 'utils/mappings';
import { useInterval, useGallery } from 'utils/hooks';
import { imageType, locationType } from 'utils/types';
import { ContentContainer, Layout, Logo } from 'components';

import { mediaScreen } from '../theme';

const Image = styled.div`
  height: calc(
    100% - ${themeGet('space.containerBorder')} -
      ${themeGet('space.containerBorder')}
  );
  width: calc(
    100% - ${themeGet('space.containerBorder')} -
      ${themeGet('space.containerBorder')}
  );
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.33, 0, 0.2, 1);
  position: absolute; /* NOTE: needed here because we need too stack the images for opacity */

  ${props =>
    props.visible &&
    css`
      opacity: 1;
    `};

  ${mediaScreen.md`
      height: calc(
        100% - ${themeGet('space.containerBorderMobile')} -
        ${themeGet('space.containerBorderMobile')}
      );
      width: calc(
        100% - ${themeGet('space.containerBorderMobile')} -
        ${themeGet('space.containerBorderMobile')}
      );
  `};
`;

const IndexLogo = styled(Logo)`
  font-size: ${themeGet('fontSizes.4xl')};
  text-shadow: rgba(0, 0, 0, 0.5) 0 0 10px;
  position: static;

  ${mediaScreen.md`
    font-size: ${themeGet('fontSizes.3xl')};
    line-height: ${themeGet('lineHeights.tight')};
  `};
`;

const PortfolioButton = styled(Link)`
  background-color: rgba(0, 0, 0, 0.05);
  border: 2px solid ${themeGet('colors.white')};
  display: inline-block;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: ${themeGet('fontSizes.sm')};
  color: ${themeGet('colors.white')};
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
  text-rendering: optimizeLegibility;
  padding: ${themeGet('space.3')} ${themeGet('space.4')};
  transition: color 170ms ease-in-out, background-color 170ms ease-in-out;

  &:hover {
    background-color: ${themeGet('colors.white')};
    color: #000;
  }

  ${mediaScreen.md`
    padding: ${themeGet('space.3')} ${themeGet('space.3')};
  `};
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 15vh;
  width: 100%;
  padding: ${themeGet('space.2')} ${themeGet('space.6')};
  justify-content: space-between;

  ${mediaScreen.md`
    display: block;
    height: 30vh;
    padding: ${themeGet('space.2')} ${themeGet('space.4')};
  `};

  ${mediaScreen.md`
    padding: ${themeGet('space.2')} ${themeGet('space.4')};
  `};
`;

export const IMAGE_DISPLAY_DURATION = 5000;

export const IndexPage = ({ images, location }) => {
  const { currentId, next } = useGallery({ images });

  useInterval(() => next(), IMAGE_DISPLAY_DURATION);

  return (
    <Layout location={location}>
      <ContentContainer>
        {images.map((image, index) => (
          <Image
            key={image.contentDigest}
            visible={currentId === image.contentDigest}
          >
            <Img
              fluid={image.fluid}
              alt={`Slideshow Image-${index + 1}`}
              style={{ height: '100%' }}
            />
          </Image>
        ))}
        <Footer>
          <IndexLogo data-testid="home-logo" color="white" mb={[5, 0]} />
          <PortfolioButton data-testid="home-enter-button" to="/portraits/">
            Portfolio
          </PortfolioButton>
        </Footer>
      </ContentContainer>
    </Layout>
  );
};

IndexPage.propTypes = {
  images: PropTypes.arrayOf(imageType).isRequired,
  location: locationType.isRequired,
};

export default compose(
  mapProps(props => ({
    ...props,
    images: mapGalleryImagesGraphQLResponse(props),
  }))
)(IndexPage);

export const IndexImagesQuery = graphql`
  query ImagesQuery {
    allFile(
      filter: { relativeDirectory: { eq: "index" } }
      sort: { fields: [relativePath] }
    ) {
      ...GalleryImagesFragment
    }
  }
`;
