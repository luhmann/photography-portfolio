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
        short_name: 'JFD Portfolio',
        start_url: '/',
        background_color: '#962E40',
        theme_color: '#962E40',
        display: 'standalone',
        icon: 'src/assets/favicon.png',
        include_favicon: true,
        legacy: true,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
