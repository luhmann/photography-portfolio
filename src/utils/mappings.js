import { path, pathOr, pipe } from 'rambda';

const flattenAllGalleriesGraphQLResponse = response =>
  response.map(({ fieldValue: albumTitle, edges: galleries }) => ({
    albumTitle,
    galleries: galleries.map(gallery => gallery.node),
  }));

export const mapAllGalleriesGraphQLResponse = pipe(
  pathOr([], 'allGalleriesYaml.group'),
  flattenAllGalleriesGraphQLResponse
);

const flattenGalleryImagesGraphQLResponse = response =>
  response
    .filter(item => item.node && item.node.childImageSharp)
    .map(
      ({
        node: {
          childImageSharp: {
            fluid,
            internal: { contentDigest },
          },
        },
      }) => ({ fluid, contentDigest })
    );

export const mapGalleryImagesGraphQLResponse = pipe(
  path('data.allFile.edges'),
  flattenGalleryImagesGraphQLResponse
);

export const mapSingleGalleryYamlGraphQLResponse = path(
  'data.galleriesYaml.title'
);
