import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'react-fns';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { dec, ifElse, inc } from 'rambda';
import { compose, mapProps, withStateHandlers } from 'recompose';
import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';
import { ContentContainer } from '../components';
import {
  mapGalleryImagesGraphQLResponse,
  mapSingleGalleryYamlGraphQLResponse,
} from '../utils/mappings';
import {
  createMaxWidthMediaQueryConditionForLabel,
  mediaScreen,
} from '../theme';

const GalleryContainer = styled(ContentContainer)`
  padding: ${themeGet('space.6')};

  ${mediaScreen.sm`
    padding: ${themeGet('space.3')};
    padding-top: ${themeGet('space.6')};
    will-change: scroll-position;
  `};
`;

const Image = styled.div`
  align-items: center;
  display: none;
  height: 100%;

  ${props =>
    props.visible &&
    css`
      display: flex;
    `};

  ${mediaScreen.sm`
    height: auto;
    margin-bottom: ${themeGet('space.3')};
  `};
`;

const Prev = styled.div`
  cursor: w-resize;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 49vw;
  z-index: ${themeGet('zIndex.low')};
`;

const Next = styled(Prev)`
  cursor: e-resize;
  left: auto;
  right: 0;
`;

const Gallery = ({ images, title, imageIndex, next, prev }) => (
  <Media query={createMaxWidthMediaQueryConditionForLabel('sm')}>
    {isPhone => (
      <GalleryContainer>
        <Helmet title={`${title} - JF Dietrich Photography`} />
        {isPhone ? null : <Prev onClick={prev} />}
        {images.map((image, index) => (
          <Image
            key={image.contentDigest}
            visible={isPhone || index === imageIndex}
          >
            <Img
              sizes={image.sizes}
              style={{ height: isPhone ? 'auto' : '100%' }}
              imgStyle={{
                objectFit: 'contain',
              }}
            />
          </Image>
        ))}
        {isPhone ? null : <Next onClick={next} />}
      </GalleryContainer>
    )}
  </Media>
);

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
      next: ({ imageIndex }, { images }) =>
        ifElse(
          () => inc(imageIndex) < images.length,
          () => ({ imageIndex: inc(imageIndex) }),
          () => ({ imageIndex: 0 })
        ),
      prev: ({ imageIndex }, { images }) =>
        ifElse(
          () => dec(imageIndex) >= 0,
          () => ({ imageIndex: dec(imageIndex) }),
          () => ({ imageIndex: dec(images.length) })
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
