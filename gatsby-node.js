const path = require('path');

const { pathOr, prop, ifElse, identity, has } = require('rambda');

const galleryTemplate = path.resolve(`src/templates/gallery.js`);

const pipe = (...fns) => input =>
  fns.reduce((chain, func) => chain.then(func), Promise.resolve(input));

// NOTE: does not guard against 0 args
const unary = fn => (...args) => fn(args[0]);

// NOTE: cannot be pulled out and rused because of the diverging es6/common.js exports in `src` vs. here
const queryGalleries = graphql => () =>
  graphql(`
    query GalleriesQuery {
      allGalleriesYaml(sort: { fields: [order] }) {
        edges {
          node {
            folderName
            path
          }
        }
      }
    }
  `);

const mapGalleriesToPage = galleries =>
  galleries.map(gallery => {
    const {
      node: { folderName, path },
    } = gallery;

    return {
      path,
      component: galleryTemplate,
      context: { folderName },
    };
  });

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

const getAllGalleriesAndImages = ({ graphql }) =>
  pipe(
    queryGalleries(graphql),
    handleGraphQlQueryErrors,
    pathOr([], 'data.allGalleriesYaml.edges'),
    mapGalleriesToPage
  );

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  try {
    const galleries = await getAllGalleriesAndImages({ graphql })();

    galleries.forEach(unary(createPage));
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
