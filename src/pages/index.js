import React from 'react';
import { compose, lifecycle, mapProps, withStateHandlers } from 'recompose';
import Img from 'gatsby-image';
import { ifElse, inc } from 'rambda';
import styled, { css } from 'styled-components';
import { mapGalleryImagesGraphQLResponse } from '../utils/mappings';
import { ContentContainer } from '../components';

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
    </ContentContainer>
  );
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
