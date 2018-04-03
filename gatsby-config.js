module.exports = {
  siteMetadata: {
    title: 'J F Dietrich Photography',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/data/`,
      },
    },
    // parse all images files
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // enable styled components
    `gatsby-plugin-styled-components`,
  ],
};
