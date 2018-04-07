import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, mapProps, withStateHandlers } from 'recompose';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import { ifElse, inc } from 'rambda';
import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';
import { mapGalleryImagesGraphQLResponse } from '../utils/mappings';
import { ContentContainer, Logo } from '../components';
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
  opacity: 1;
  transition: opacity 1s cubic-bezier(0.33, 0, 0.2, 1);
  position: absolute; /* NOTE: needed here because we need too stack the images for opacity */

  ${props =>
    props.invisible &&
    css`
      opacity: 0;
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
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serf;
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

let intervalId;
const clearSideshowInterval = ({ intervalId }) =>
  window.clearInterval(intervalId);

const IndexPage = ({ images, imageIndex }) => (
  <ContentContainer>
    {images.map((image, index) => (
      <Image key={image.contentDigest} invisible={index !== imageIndex}>
        <Img sizes={image.sizes} style={{ height: '100%' }} />
      </Image>
    ))}
    <Footer>
      <IndexLogo color="white" mb={[5, 0]} />
      <PortfolioButton to="/norway">Portfolio</PortfolioButton>
    </Footer>
  </ContentContainer>
);

IndexPage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      sizes: PropTypes.object.isRequired,
      contentDigest: PropTypes.string.isRequired,
    })
  ).isRequired,
  imageIndex: PropTypes.number.isRequired,
};

export default compose(
  mapProps(props => ({
    images: mapGalleryImagesGraphQLResponse(props),
  })),

  withStateHandlers(
    ({ initialImageIndex = 0 }) => ({ imageIndex: initialImageIndex }),
    {
      next: ({ imageIndex }, { images }) =>
        ifElse(
          () => inc(imageIndex) < images.length,
          () => ({ imageIndex: inc(imageIndex) }),
          () => ({ imageIndex: 0 })
        ),
    }
  ),
  lifecycle({
    componentDidMount() {
      intervalId = window.setInterval(() => {
        this.props.next();
      }, 5000);
    },
    componentWillUnmount() {
      clearSideshowInterval(intervalId);
    },
  })
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
