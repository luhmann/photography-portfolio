const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const galleryTemplate = path.resolve(`src/templates/gallery.js`);

  return graphql(`
    query GalleriesQuery {
      allGalleriesYaml {
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
    console.log(JSON.stringify(result));
    result.data.allGalleriesYaml.edges.map(gallery => {
      const { node: { folderName, path } } = gallery;

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
