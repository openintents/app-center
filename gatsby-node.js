const path = require('path')
const fetch = require('node-fetch')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const appMetas = require('./src/data/app-meta-data')
const unlistedApps = require('./unlisted-apps')
const listedApps = require('./appco')

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

getLastCommit = openSourceUrl => {
  if (openSourceUrl.startsWith('https://github.com/')) {
    if (openSourceUrl == 'https://github.com/radicleart') {
      openSourceUrl = 'https://github.com/radicleart/brightblock-dbid'
    } else if (openSourceUrl.startsWith('https://github.com/envelop-app')) {
      openSourceUrl = 'https://github.com/envelop-app/envelop-web'
    } else if (openSourceUrl == 'https://github.com/lannister-capital') {
      openSourceUrl = 'https://github.com/lannister-capital/lannister-app'
    } else if (openSourceUrl == 'https://github.com/Satoshis-Games') {
      openSourceUrl = 'https://github.com/Satoshis-Games/Games'
    } else if (openSourceUrl == 'https://github.com/blocksnacks') {
      openSourceUrl = 'https://github.com/blocksnacks/snack-client'
    } else if (openSourceUrl == 'https://github.com/runkod') {
      openSourceUrl = 'https://github.com/runkod/runkod-app'
    } else if (openSourceUrl == 'https://github.com/pixus-tech') {
      openSourceUrl = 'https://github.com/pixus-tech/webapp'
    } else if (openSourceUrl == 'https://github.com/Satoshis-Games') {
      openSourceUrl = 'https://github.com/Satoshis-Games/Games'
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
    } else if (openSourceUrl.startsWith('https://gitlab.com/riot.ai/landho')) {
      projectId = 13579531
    } else if (
      openSourceUrl.startsWith('https://gitlab.com/CodeDarkin/aroundtheblock')
    ) {
      projectId = 13870632
    } else if (
      openSourceUrl.startsWith('https://gitlab.com/marassifrancesco/atoms')
    ) {
      projectId = 16088164
    } else if (
      openSourceUrl.startsWith('https://gitlab.com/marassifrancesco/cozyreader')
    ) {
      projectId = 15752295
    } else if (
      openSourceUrl.startsWith('https://gitlab.com/vaultilo/vaultilo-app')
    ) {
      projectId = 16632883
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
  } else if (openSourceUrl.startsWith('https://bitbucket.org/')) {
    const parts = openSourceUrl.substr(22).split('/')
    if (parts.length == 2) {
      const username = parts[0]
      const repoSlug = parts[1]
      return fetch(
        `https://api.bitbucket.org/2.0/repositories/${username}/${repoSlug}/commits`
      )
        .then(r => r.json())
        .then(response => {
          if (response.values && response.values.length > 0) {
            return response.values[0].date
          } else {
            return 'No commits found - ' + response.error.message
          }
        })
        .catch(e => {
          return Promise.resolve('Failure on bitbucket call ' + e)
        })
    } else {
      return Promise.resolve('Invalid bitbucket repo')
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
  await addLocalFileNodeByUrl(
    'https://assets.gitlab-static.net/uploads/-/system/project/avatar/12323770/icon.png',
    node,
    store,
    cache,
    createNode,
    createNodeId,
    _auth
  )
}

async function addLocalFileNodeByUrl(
  url,
  node,
  store,
  cache,
  createNode,
  createNodeId,
  _auth
) {
  const fileNode = await createRemoteFileNode({
    url: url,
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
    console.log(`no local file for app ${node.id} and url ${url}`)
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
    await addLocalFileNodeByUrl(
      node[imagePropertyName].trim(),
      node,
      store,
      cache,
      createNode,
      createNodeId,
      _auth
    )
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
  if (node.internal.type === 'apps' || node.internal.type === 'unlistedApps') {
    if (node.id__normalized === 924) {
      await addLocalFileNodeByUrl(
        'https://chat.openintents.org/vector-icons/android-chrome-512x512.png',
        node,
        store,
        cache,
        createNode,
        createNodeId,
        _auth
      )
    } else if (node.id__normalized === 1571) {
      await addLocalFileNodeByUrl(
        'https://blocksurvey.io/assets/images/blocksurvey-favicon-color.svg',
        node,
        store,
        cache,
        createNode,
        createNodeId,
        _auth
      )
    } else if (
      [1555, 1712].indexOf(node.id__normalized) < 0 // wrong image format
      //&& process.env.GATSBY_GITHUB_TOKEN !== 'INVALID'
    ) {
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

    var appMeta
    const appMetaList = appMetas.filter(m => m.id === node.id__normalized)
    if (appMetaList.length > 0) {
      appMeta = appMetaList[0]
    }
    if (appMeta) {
      await createNodeField({
        node,
        name: 'manifestUrl',
        value: appMeta.manifestUrl,
        type: 'String',
      })

      await createNodeField({
        node,
        name: 'authors',
        value: JSON.stringify(appMeta.authors),
        type: 'String',
      })

      await createNodeField({
        node,
        name: 'error',
        value: appMeta.error,
        type: 'String',
      })
    }
  } else if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    await createNodeField({
      name: `slug`,
      node,
      value,
    })
  } else if (node.internal.type === `AppPublishersJson`) {
    if (
      node.profile &&
      node.profile.image &&
      node.profile.image.length > 0 &&
      node.profile.image[0].contentUrl.trim()
    ) {
      avatarUrl = node.profile.image[0].contentUrl
      const fileNode = await createRemoteFileNode({
        url: avatarUrl,
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
    } else {
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
}

createPosts = async (graphql, actions) => {
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

async function createAppPublishers(graphql, actions) {
  const { createPage } = actions
  const publishers = require('./src/data/app-publishers.json')
  Promise.all(
    publishers.map(p => {
      return createPage({
        path: `/u/${p.username}/`,
        component: require.resolve('./src/templates/publisher.js'),
        context: {
          apps: p.apps,
          username: p.username,
        },
      })
    })
  )
}
exports.createPages = async ({ graphql, actions }) => {
  await createPosts(graphql, actions)
  await createAppPublishers(graphql, actions)

  const { createPage, createRedirect } = actions
  const result = await graphql(`
    {
      allApps {
        edges {
          node {
            appcoid: id__normalized
            name
          }
        }
      }
    }
  `)
  const apps = result.data.allApps.edges
    .map(e => e.node)
    .filter(node => {
      return process.env.GATSBY_GITHUB_TOKEN === 'INVALID'
        ? [924, 216, 1832, 2296].indexOf(node.appcoid) >= 0
        : true
    })
  return Promise.all(
    apps.map(async node => {
      const authDomains = appMetas
        .filter(metaData => {
          if (metaData.id === node.appcoid && metaData.manifestUrl) {
            try {
              new URL(metaData.manifestUrl)
              return true
            } catch (e) {
              console.log(
                'Invalid URL for ' + node.appcoid + ': ' + metaData.manifestUrl
              )
              return false
            }
          } else {
            return false
          }
        })
        .map(metaData => new URL(metaData.manifestUrl).origin)

      await createPage({
        path: '/appco/' + node.appcoid,
        component: path.resolve('./src/templates/appcodetails.js'),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          appcoid: node.appcoid,
          appname: node.name,
          authDomain: authDomains.length > 0 ? authDomains[0] : '',
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

      createRedirect({
        fromPath: `/a/${slugify(node.name)}`,
        toPath: `/appco/${node.appcoid}`,
        isPermanent: true,
      })
      createRedirect({
        fromPath: `/a/${slugify(node.name)}/review`,
        toPath: `/appco/${node.appcoid}/review`,
        isPermanent: true,
      })

      if (authDomains.length > 0) {
        createRedirect({
          fromPath: `/a/${authDomains[0]}`,
          toPath: `/appco/${node.appcoid}`,
          isPermanent: true,
        })
        createRedirect({
          fromPath: `/a/${authDomains[0]}/review`,
          toPath: `/appco/${node.appcoid}/review`,
          isPermanent: true,
        })
      }
    })
  )
}

const createAppsNodes = async (
  appData,
  createNodeId,
  createContentDigest,
  createNode
) => {
  const nodeContent = JSON.stringify(appData)
  appData.id__normalized = appData.id
  const nodeMeta = {
    id: createNodeId(`apps-${appData.id}`),
    parent: null,
    children: [],
    internal: {
      type: `apps`,
      mediaType: `text/json`,
      content: nodeContent,
      contentDigest: createContentDigest(appData),
    },
  }
  const node = Object.assign({}, appData, nodeMeta)
  return createNode(node)
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  const allApps = unlistedApps.apps.concat(listedApps.apps)
  await Promise.all(
    allApps.map(app => {
      createAppsNodes(app, createNodeId, createContentDigest, createNode)
    })
  )
}
