import { path, pathOr, pipe, map } from 'rambda';

const flattenAllGalleriesGraphQLResponse = response =>
  response.map(({ fieldValue: albumTitle, edges: galleries }) => ({
    albumTitle,
    galleries: galleries.map(path('node')),
  }));

export const mapAllGalleriesGraphQLResponse = pipe(
  pathOr([], 'allGalleriesYaml.group'),
  flattenAllGalleriesGraphQLResponse
);

export const mapGalleryImagesGraphQLResponse = pipe(
  pathOr([], 'data.allFile.edges'),
  map(
    pipe(
      pathOr([], 'node.childImageSharp'),
      img => ({
        fluid: img.fluid,
        contentDigest: path('internal.contentDigest', img),
      })
    )
  )
);

export const mapSingleGalleryYamlGraphQLResponse = path(
  'data.galleriesYaml.title'
);
