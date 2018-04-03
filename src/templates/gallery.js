import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import { color, space } from 'styled-system';

const GalleryContainer = styled.div`
  ${space};
  ${color};
  height: 100vh;
`;

const Image = styled.div`
  ${space};
  ${props =>
    props.invisible &&
    css`
      display: none;
    `};
`;

export default function Template({ data, pathContext: { name } }) {
  console.log(data, name);
  const { allFile: { edges: images } } = data;
  return (
    <GalleryContainer bg="white" p={4} mr={3}>
      <Helmet title={`${name} - Album`} />
      {images.map((image, index) => {
        const {
          node: { childImageSharp: { sizes, internal: { contentDigest } } },
        } = image;
        return (
          <Image mb={2} invisible={index > 0}>
            <Img key={contentDigest} sizes={sizes} />
          </Image>
        );
      })}
    </GalleryContainer>
  );
}

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
