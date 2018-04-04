module.exports = {
  siteMetadata: {
    title: 'J F Dietrich Photography',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/data/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `galleries`,
        path: `${__dirname}/data/galleries`,
      },
    },
    // Parse Album info
    `gatsby-transformer-yaml`,
    // Parse all images files
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // Enable styled components
    `gatsby-plugin-styled-components`,
    // Use Gatsby with React 16, can be removed once gatsby v2 comes out
    `gatsby-plugin-react-next`,
  ],
};
