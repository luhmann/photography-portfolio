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
