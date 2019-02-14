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
    // parse album info
    `gatsby-transformer-yaml`,
    // parse all images files
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // enable styled components
    `gatsby-plugin-styled-components`,
    // optimize svgs
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: true,
        viewBox: false,
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },
    // enable pwa
    /* eslint-disable camelcase */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'J F Dietrich Photography',
        short_name: 'JFD',
        start_url: '/',
        background_color: '#000000',
        theme_color: '#CC1F1A',
        display: 'minimal-ui',
        icon: 'src/assets/favicon.png',
      },
    },
    `gatsby-plugin-offline`,
  ],
};
