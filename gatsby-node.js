const path = require('path')
const fetch = require('node-fetch')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { createFilePath } = require(`gatsby-source-filesystem`)

getLastCommit = openSourceUrl => {
  if (openSourceUrl.startsWith('https://github.com/')) {
    if (openSourceUrl.startsWith('https://github.com/radicleart')) {
      openSourceUrl = 'https://github.com/radicleart/brightblock-dbid'
    }
    const parts = openSourceUrl.substr(19).split('/')
    if (parts.length > 1) {
      const owner = parts[0]
      const repo = parts[1]
      const url =
        'https://api.github.com/repos/' + owner + '/' + repo + '/commits'
      return fetch(url, {
        headers: { Authorization: 'token ' + process.env.GATSBY_GITHUB_TOKEN },
      })
        .then(response => response.json(), () => 'No json')
        .then(
          response => {
            if (
              response &&
              response.length > 0 &&
              response[0].commit &&
              response[0].commit.author
            ) {
              return response[0].commit.author.date
            } else {
              return 'No commits found - ' + response.message
            }
          },
          () => {
            return 'Error on commit requests'
          }
        )
    } else {
      return Promise.resolve('Unsupported github url')
    }
  } else if (openSourceUrl.startsWith('https://gitlab.com/')) {
    if (openSourceUrl.startsWith('https://gitlab.com/riot.ai/NoteRiot')) {
      projectId = 5538365
    } else if (openSourceUrl.startsWith('https://gitlab.com/friedger/app')) {
      projectId = 12323770
    } else {
      projectId = 0
    }
    if (projectId != 0) {
      const url =
        'https://gitlab.com/api/v4/projects/' +
        projectId +
        '/repository/commits'
      return fetch(url)
        .then(response => response.json(), () => 'No json')
        .then(
          response => {
            if (response && response.length > 0) {
              return response[0].authored_date
            } else {
              return 'No commits found - ' + response.message
            }
          },
          () => {
            return 'Error on commit requests'
          }
        )
    } else {
      return Promise.resolve('Unsupported gitlab repo')
    }
  } else {
    return Promise.resolve('Unsupported source repo')
  }
}
async function addDummyLocalFileNode(
  node,
  store,
  cache,
  createNode,
  createNodeId,
  _auth
) {
  try {
    const fileNode = await createRemoteFileNode({
      url:
        'https://assets.gitlab-static.net/uploads/-/system/project/avatar/12323770/icon.png',
      parentNodeId: node.id,
      store,
      cache,
      createNode,
      createNodeId,
      auth: _auth,
    })
    if (fileNode) {
      node.localFile___NODE = fileNode.id
    } else {
      console.log(`no dummy node for app ${node.id}`)
    }
  } catch (e) {
    console.log(e)
  }
}

async function addLocalFileNode(
  node,
  imagePropertyName,
  store,
  cache,
  createNode,
  createNodeId,
  _auth
) {
  if (node[imagePropertyName] && node[imagePropertyName].trim()) {
    const fileNode = await createRemoteFileNode({
      url: node[imagePropertyName].trim(),
      parentNodeId: node.id,
      store,
      cache,
      createNode,
      createNodeId,
      auth: _auth,
    })
    if (fileNode) {
      node.localFile___NODE = fileNode.id
    }
  }
}

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  cache,
  store,
  _auth,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions
  if (node.internal.type === `apps`) {
    if (node.id__normalized !== 1555) {
      // wrong image format
      try {
        await addLocalFileNode(
          node,
          'imgixImageUrl',
          store,
          cache,
          createNode,
          createNodeId,
          _auth
        )
      } catch (e) {
        console.log(`file node error ${node.name}`, e)
        try {
          await addLocalFileNode(
            node,
            'imageUrl',
            store,
            cache,
            createNode,
            createNodeId,
            _auth
          )
        } catch (e) {
          console.log(`file node error2 ${node.name}`, e)
          await addDummyLocalFileNode(
            node,
            store,
            cache,
            createNode,
            createNodeId,
            _auth
          )
        }
      }
    } else {
      console.log('Skipping ' + node.imageUrl + ' ' + node.imgixImageUrl)
      await addDummyLocalFileNode(
        node,
        store,
        cache,
        createNode,
        createNodeId,
        _auth
      )
    }

    if (node.openSourceUrl && node.openSourceUrl !== '') {
      const lastCommit =
        process.env.GATSBY_GITHUB_TOKEN === 'INVALID'
          ? Promise.resolve('N/A')
          : getLastCommit(node.openSourceUrl)
      try {
        commitString = await lastCommit

        await createNodeField({
          node,
          name: `lastCommit`,
          value: commitString,
          type: 'String',
        })
      } catch (e) {
        console.log(`last commit error ${node.name}`, e)
        throw e
      }
    }
  } else if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    await createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

createPosts = (graphql, actions) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}

exports.createPages = async ({ graphql, actions }) => {
  createPosts(graphql, actions)

  const { createPage } = actions
  const result = await graphql(`
    {
      appco {
        apps {
          appcoid: id__normalized
          name
        }
      }
    }
  `)
  const apps =
    process.env.GATSBY_GITHUB_TOKEN === 'INVALID'
      ? result.data.appco.apps.slice(0, 3)
      : result.data.appco.apps
  return Promise.all(
    apps.map(async node => {
      await createPage({
        path: '/appco/' + node.appcoid,
        component: path.resolve('./src/templates/appcodetails.js'),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          appcoid: node.appcoid,
          appname: node.name,
        },
      })

      await createPage({
        path: '/appco/' + node.appcoid + '/review',
        component: path.resolve('./src/templates/appco-comment.js'),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          appcoid: node.appcoid,
          appname: node.name,
        },
      })
    })
  )
}
