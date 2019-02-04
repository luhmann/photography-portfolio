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

export const allGalleriesYamlFragment = graphql`
  fragment allGalleriesYamlFragment on Query {
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

export const singleGalleryYamlFragment = graphql`
  fragment singleGalleryYamlFragment on Query {
    galleriesYaml(folderName: { eq: $folderName }) {
      title
    }
  }
`;
