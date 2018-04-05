import { path, pathOr, pipe } from 'rambda';

const flattenAllGalleriesGraphQLResponse = response =>
  response.map(({ fieldValue: albumTitle, edges: galleries }) => ({
    albumTitle,
    galleries: galleries.map(gallery => gallery.node),
  }));

export const mapAllGalleriesGraphQLResponse = pipe(
  pathOr([], 'data.allGalleriesYaml.group'),
  flattenAllGalleriesGraphQLResponse
);

const flattenGalleryImagesGraphQLResponse = response =>
  response.map(
    ({
      node: { childImageSharp: { sizes, internal: { contentDigest } } },
    }) => ({ sizes, contentDigest })
  );

export const mapGalleryImagesGraphQLResponse = pipe(
  path('data.allFile.edges'),
  flattenGalleryImagesGraphQLResponse
);

export const mapSingleGalleryYamlGraphQLResponse = path(
  'data.galleriesYaml.title'
);
