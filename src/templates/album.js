import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';

export default function Template({ data, pathContext: { name } }) {
  console.log(data, name);
  const { allFile: { edges: images } } = data;
  return (
    <div className="album-container">
      <Helmet title={`${name} - Album`} />
      <div className="album" style={{ width: '100vw', height: '100vh' }}>
        {images.map(image => {
          const {
            node: { childImageSharp: { sizes, internal: { contentDigest } } },
          } = image;
          return <Img key={contentDigest} sizes={sizes} />;
        })}
      </div>
    </div>
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
