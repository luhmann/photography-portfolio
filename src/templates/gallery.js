import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { dec, ifElse, inc, partialCurry } from 'rambda';
import { withStateHandlers } from 'recompose';
import styled, { css } from 'styled-components';
import { color, space } from 'styled-system';

const GalleryContainer = styled.div`
  ${space};
  ${color};
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  right: 6px;
`;

const Image = styled.div`
  ${space};

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

const Gallery = ({ data, pathContext: { name }, imageIndex, next, prev }) => {
  const { allFile: { edges: images } } = data;
  const curNext = partialCurry(next, { totalImages: images.length });
  const curPrev = partialCurry(prev, { totalImages: images.length });

  return (
    <GalleryContainer bg="white" p={6}>
      <Helmet title={`${name} - Album`} />
      <Prev onClick={() => curPrev()} />
      {images.map((image, index) => {
        const {
          node: { childImageSharp: { sizes, internal: { contentDigest } } },
        } = image;
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
      <Next onClick={() => curNext()} />
    </GalleryContainer>
  );
};

Gallery.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({ edges: PropTypes.arrayOf(PropTypes.object) }),
  }).isRequired,
  pathContext: PropTypes.shape({ name: PropTypes.string.isRequired })
    .isRequired,
  imageIndex: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
};

Gallery.displayName = 'Gallery';

export default withStateHandlers(
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
)(Gallery);

// Disabling eslint linting for graphql-global but only here
/* eslint-disable-next-line */
export const pageQuery = graphql`
  query ImagesByPath($name: String!) {
    allFile(
      filter: { relativeDirectory: { eq: $name } }
      sort: { fields: [relativePath] }
    ) {
      edges {
        node {
          childImageSharp {
            internal {
              contentDigest
            }
            sizes(maxWidth: 2500, quality: 75) {
              ...GatsbyImageSharpSizes_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`;
