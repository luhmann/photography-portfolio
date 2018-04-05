export const GalleryImagesFragment = graphql`
  fragment GalleryImagesFragment on FileConnection {
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
`;

export const allGalleriesYamlFragment = graphql`
  fragment allGalleriesYamlFragment on RootQueryType {
    allGalleriesYaml {
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
  fragment singleGalleryYamlFragment on RootQueryType {
    galleriesYaml(folderName: { eq: $folderName }) {
      title
    }
  }
`;
