import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
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
  return (
    <GalleryContainer bg="white" p={6}>
      <Helmet title={`${name} - Album`} />
      <Prev onClick={() => prev()} />
      {images.map((image, index) => {
        const {
          node: { childImageSharp: { sizes, internal: { contentDigest } } },
        } = image;
        return (
          <Image key={contentDigest} invisible={index !== imageIndex}>
            <Img sizes={sizes} />
          </Image>
        );
      })}
      <Next onClick={() => next()} />
    </GalleryContainer>
  );
};

export default withStateHandlers(
  ({ initialImageIndex = 0 }) => ({
    imageIndex: initialImageIndex,
  }),
  {
    next: ({ imageIndex }) => () => ({ imageIndex: imageIndex + 1 }),
    prev: ({ imageIndex }) => () => ({ imageIndex: imageIndex - 1 }),
    showIndex: ({ imageIndex }) => nextIndex => ({ imageIndex: nextIndex }),
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
            sizes(maxWidth: 2500) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }
  }
`;
