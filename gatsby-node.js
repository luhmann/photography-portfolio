const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const galleryTemplate = path.resolve(`src/templates/gallery.js`);

  return graphql(`
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
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allGalleriesYaml.edges.map(gallery => {
      const {
        node: { folderName, path },
      } = gallery;

      createPage({
        path,
        component: galleryTemplate,
        context: { folderName },
      });

      return gallery;
    });

    return Promise.resolve();
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
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
