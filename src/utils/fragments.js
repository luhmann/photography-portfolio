import { graphql } from 'gatsby';
export const GalleryImagesFragment = graphql`
  fragment GalleryImagesFragment on FileConnection {
    edges {
      node {
        childImageSharp {
          internal {
            contentDigest
          }
          fluid(maxWidth: 2500, quality: 75) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  }
`;

export const AllGalleriesYamlFragment = graphql`
  fragment AllGalleriesYamlFragment on Query {
    allGalleriesYaml(sort: { fields: [order] }) {
      group(field: album) {
        fieldValue
        edges {
          node {
            title
            path
          }
        }
      }
    }
  }
`;

export const SingleGalleryYamlFragment = graphql`
  fragment SingleGalleryYamlFragment on Query {
    galleriesYaml(folderName: { eq: $folderName }) {
      title
    }
  }
`;
