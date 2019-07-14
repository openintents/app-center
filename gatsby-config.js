var proxy = require('http-proxy-middleware')

module.exports = {
  siteMetadata: {
    title: 'OI App Center',
    description: `App reviews done right!`,
    author: `@friedger`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/data/*`] },
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
        background_color: `#72a7cf`,
        theme_color: `#72a7cf`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-custom-api',
      options: {
        url: 'https://api.app.co/api/app-mining-apps',
        rootKey: 'appco',
        schemas: {
          appco: `
                        apps: [apps]
                    `,
          apps: `
                        id: Int
                        name: String
                        openSourceUrl: String
                        description: String
                        category: String
                        imageUrl: String
                    `,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-transformer-excel`,
      options: {
        raw: false,
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`name`, `category`, `description`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type app, list how to resolve the fields` values
          apps: {
            name: node => node.name,
            category: node => node.category,
            description: node => node.description,
            appcoid: node => node.id__normalized,
          },
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
