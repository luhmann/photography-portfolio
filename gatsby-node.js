const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const galleryTemplate = path.resolve(`src/templates/gallery.js`);

  return graphql(`
    query AlbumQuery {
      allFile(
        filter: { relativeDirectory: { ne: "" } }
        sort: { fields: [relativePath] }
      ) {
        group(field: relativeDirectory) {
          fieldValue
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allFile.group.map(album => {
      const { fieldValue: name, edges: images } = album;

      createPage({
        path: name,
        component: galleryTemplate,
        context: { name },
      });
    });
  });
};
