import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, mapProps, withStateHandlers } from 'recompose';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import { ifElse, inc } from 'rambda';
import styled, { css } from 'styled-components';
import { mapGalleryImagesGraphQLResponse } from '../utils/mappings';
import { ContentContainer, Logo } from '../components';
import { themeGet } from 'styled-system';

const Image = styled.div`
  height: 100%;
  width: 100%;
  opacity: 1;
  transition: opacity 1s cubic-bezier(0.33, 0, 0.2, 1);
  position: absolute;
  top: 0;

  ${props =>
    props.invisible &&
    css`
      opacity: 0;
    `};
`;

const IndexLogo = styled(Logo)`
  font-size: ${themeGet('fontSizes.4xl')};
  text-shadow: rgba(0, 0, 0, 0.5) 0 0 10px;
  position: static;
`;

const PortfolioButton = styled(Link)`
  background-color: rgba(0, 0, 0, 0.05);
  border: 2px solid ${themeGet('colors.white')};
  display: block;
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
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 15vh;
  width: 100%;
  padding: ${themeGet('space.0')} ${themeGet('space.6')};
  justify-content: space-between;
`;

let intervalId;
const clearSideshowInterval = ({ intervalId }) =>
  window.clearTimeout(intervalId);

const IndexPage = ({ images, imageIndex, next }) => {
  console.log(images, imageIndex, next);
  return (
    <ContentContainer>
      {images.map((image, index) => (
        <Image key={image.contentDigest} invisible={index !== imageIndex}>
          <Img sizes={image.sizes} style={{ height: '100%' }} />
        </Image>
      ))}
      <Footer>
        <IndexLogo color="white" />
        <PortfolioButton to="/norway">Portfolio</PortfolioButton>
      </Footer>
    </ContentContainer>
  );
};

IndexPage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      sizes: PropTypes.object.isRequired,
      contentDigest: PropTypes.string.isRequired,
    })
  ).isRequired,
  imageIndex: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
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
