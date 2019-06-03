var proxy = require('http-proxy-middleware')

module.exports = {
  siteMetadata: {
    title: 'OI App Center',
    description: `Manage your apps, comments, ratings.`,
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
        name: `OI App Center for Blockstack`,
        short_name: `OI App Center`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-custom-api",
      options: {
          url: "https://api.app.co/api/app-mining-apps",
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
