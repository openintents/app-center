var proxy = require('http-proxy-middleware')

module.exports = {
  siteMetadata: {
    title: 'Blockstack App Mining Apps (April 2019)',
    description: `Directory of apps participating in App Mining.`,
    author: `@friedger`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-blockstack`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-custom-api",
      options: {
          url: "https://app-co-api.herokuapp.com/api/app-mining-apps",
          rootKey: "appco",
                schemas: {
                    appco: `
                        apps: [apps]
                    `,
                    apps: `
                        id: Int
                        name: String
                        openSourceUrl: String
                    `
                }
      }
  },
  `gatsby-transformer-excel`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `data`,
      path: `${__dirname}/src/data/`,
    },
  },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
