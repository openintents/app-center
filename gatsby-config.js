var proxy = require('http-proxy-middleware')

module.exports = {
  siteMetadata: {
    title: 'OI App Center',
    description: `App reviews done right!`,
    author: `@friedger`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
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
        did_authors: [`friedger.id`],
      },
    },
    `gatsby-plugin-offline`,
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
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-transformer-excel-limited`,
      options: {
        raw: false,
        sourceInstanceName: `data`,
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
          markdownRemark: {
            name: node => node.frontmatter.title,
            category: () => 'Blog',
            description: node => node.excerpt,
            appcoid: () => -1,
          },
          appPublishersJson: {
            name: node => node.profile.name || node.username,
            category: () => 'App Publisher',
            description: node => node.profile.description,
            appcoid: () => {
              if (node.apps && node.apps.length > 0) {
                return node.apps[0]
              } else {
                return -1
              }
            },
          },
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
