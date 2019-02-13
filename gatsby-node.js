const path = require('path');

const { pathOr, prop, ifElse, identity, has, map } = require('rambda');

const galleryTemplate = path.resolve(`src/templates/gallery.js`);

const pipe = (...fns) => input =>
  fns.reduce((chain, func) => chain.then(func), Promise.resolve(input));

const handleError = error => {
  throw new Error(error);
};

const handleGraphQlQueryErrors = ifElse(
  has('errors'),
  pipe(
    prop('errors'),
    handleError
  ),
  identity
);

// NOTE: cannot be pulled out and reused because of the diverging es6/common.js exports in `src` vs. here
const queryGalleries = graphql => () =>
  graphql(`
    query GalleriesQuery {
      allGalleriesYaml(sort: { fields: [order] }) {
        edges {
          node {
            folderName
            path
            title
          }
        }
      }
    }
  `);

const extractGalleryData = galleries =>
  galleries.map(({ node: { folderName, path, title } }) => ({
    folderName,
    path,
    title,
  }));

const getAllGalleries = ({ graphql }) =>
  pipe(
    queryGalleries(graphql),
    handleGraphQlQueryErrors,
    pathOr([], 'data.allGalleriesYaml.edges'),
    extractGalleryData
  );

const queryImagesForGallery = ({ graphql }) => ({ folderName }) =>
  graphql(
    `
      query GalleryQuery($folderName: String!) {
        allFile(
          filter: { relativeDirectory: { eq: $folderName } }
          sort: { fields: [relativePath] }
        ) {
          edges {
            node {
              childImageSharp {
                internal {
                  contentDigest
                }
              }
            }
          }
        }
      }
    `,
    {
      folderName,
    }
  );

const extractImagesData = pipe(
  pathOr([], 'data.allFile.edges'),
  map(pathOr(undefined, 'node.childImageSharp.internal.contentDigest'))
);

const getImagesForGalleries = ({ graphql }) =>
  pipe(
    queryImagesForGallery({ graphql }),
    handleGraphQlQueryErrors,
    extractImagesData
  );

const getCreatePagePayload = ({
  path,
  basePath,
  title,
  folderName,
  initialId,
}) => ({
  path,
  component: galleryTemplate,
  context: {
    pathname: basePath,
    initialId,
    folderName,
    title,
  },
});

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  try {
    const galleries = await getAllGalleries({ graphql })();

    galleries.forEach(async gallery => {
      const { path, title, folderName } = gallery;
      const imageIds = await getImagesForGalleries({ graphql })(gallery);

      const createPagePayload = getCreatePagePayload({
        path: `${path}`,
        basePath: path,
        title,
        folderName,
      });

      imageIds.forEach(contentDigest =>
        createPage(
          getCreatePagePayload({
            path: `${path}/${contentDigest}`,
            basePath: path,
            title,
            folderName,
            initialId: contentDigest,
          })
        )
      );

      createPage(createPagePayload);
    });
  } catch (err) {
    throw err;
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: ['node_modules'],
      alias: {
        assets: path.resolve(__dirname, 'src', 'assets'),
        components: path.resolve(__dirname, 'src', 'components'),
        pages: path.resolve(__dirname, 'src', 'pages'),
        templates: path.resolve(__dirname, 'src', 'templates'),
        utils: path.resolve(__dirname, 'src', 'utils'),
      },
    },
  });
};
