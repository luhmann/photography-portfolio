import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { dec, ifElse, inc, partialCurry } from 'rambda';
import { withStateHandlers } from 'recompose';
import styled, { css } from 'styled-components';
import { color, space } from 'styled-system';
import { style } from 'styled-system/dist/util';

const GalleryContainer = styled.div`
  ${space};
  ${color};
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
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

const Template = ({ data, pathContext: { name }, imageIndex, next, prev }) => {
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
    showIndex: ({ imageIndex }) => ({ nextIndex }) => ({
      imageIndex: nextIndex,
    }),
  }
)(Template);

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
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }
  }
`;
