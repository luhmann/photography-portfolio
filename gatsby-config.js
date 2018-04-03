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
    // Parse all images files
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
