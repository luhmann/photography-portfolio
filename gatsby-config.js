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
    // Optimize svgs
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: true,
        viewBox: false,
      },
    },
    // Enable pwa
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
  ],
};
