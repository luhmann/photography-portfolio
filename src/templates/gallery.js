import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { dec, ifElse, inc, partialCurry } from 'rambda';
import { compose, mapProps, withStateHandlers } from 'recompose';
import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';
import { ContentContainer } from '../components';
import {
  mapGalleryImagesGraphQLResponse,
  mapSingleGalleryYamlGraphQLResponse,
} from '../utils/mappings';

const GalleryContainer = styled(ContentContainer)`
  padding: ${themeGet('space.6')};
`;

const Image = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  position: relative;
  overflow: hidden;

  ${props =>
    props.invisible &&
    css`
      display: none;
    `};
`;

const Prev = styled.div`
  cursor: w-resize;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 49vw;
  z-index: 10;
`;

const Next = styled(Prev)`
  cursor: e-resize;
  left: auto;
  right: 0;
`;

const Gallery = ({ images, title, imageIndex, next, prev }) => {
  const curNext = partialCurry(next, { totalImages: images.length });
  const curPrev = partialCurry(prev, { totalImages: images.length });

  return (
    <GalleryContainer>
      <Helmet title={`${title} - JF Dietrich Photography`} />
      <Prev onClick={curPrev} />
      {images.map((image, index) => {
        const { sizes, contentDigest } = image;
        return (
          <Image key={contentDigest} invisible={index !== imageIndex}>
            <Img
              sizes={sizes}
              style={{ height: '100%' }}
              imgStyle={{
                objectFit: 'contain',
              }}
            />
          </Image>
        );
      })}
      <Next onClick={curNext} />
    </GalleryContainer>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      sizes: PropTypes.object.isRequired,
      contentDigest: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  imageIndex: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
};

Gallery.displayName = 'Gallery';

export default compose(
  mapProps(props => ({
    images: mapGalleryImagesGraphQLResponse(props),
    title: mapSingleGalleryYamlGraphQLResponse(props),
  })),
  withStateHandlers(
    ({ initialImageIndex = 0 }) => ({
      imageIndex: initialImageIndex,
    }),
    {
      next: ({ imageIndex }) =>
        ifElse(
          ({ totalImages }) => inc(imageIndex) < totalImages,
          () => ({ imageIndex: inc(imageIndex) }),
          () => ({ imageIndex: 0 })
        ),
      prev: ({ imageIndex }) =>
        ifElse(
          () => dec(imageIndex) >= 0,
          () => ({ imageIndex: dec(imageIndex) }),
          ({ totalImages }) => ({ imageIndex: dec(totalImages) })
        ),
      showIndex: () => ({ nextIndex }) => ({
        imageIndex: nextIndex,
      }),
    }
  )
)(Gallery);

export const pageQuery = graphql`
  query Gallery($folderName: String!) {
    ...singleGalleryYamlFragment
    allFile(
      filter: { relativeDirectory: { eq: $folderName } }
      sort: { fields: [relativePath] }
    ) {
      ...GalleryImagesFragment
    }
  }
`;
