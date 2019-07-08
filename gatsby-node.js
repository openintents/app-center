const path = require('path')
const fetch = require('node-fetch')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

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
            if (response && response.length > 0) {
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

    if( !node.imageUrl.trim()) ) return Promise.resolve()

    console.log("url '" +node.imageUrl.trim()+"'");
    return createRemoteFileNode({
      url: node.imageUrl.trim(),
      parentNodeId: node.id,
      store,
      cache,
      createNode,
      createNodeId,
      auth: _auth,
    })
      .then(fileNode => {
        if (fileNode) {
          node.localFile___NODE = fileNode.id
        }

        if (node.openSourceUrl && node.openSourceUrl !== '') {
          const lastCommit =
            process.env.GATSBY_GITHUB_TOKEN === 'INVALID'
              ? Promise.resolve('N/A')
              : getLastCommit(node.openSourceUrl)
          return lastCommit.then(r => {
            createNodeField({
              node,
              name: `lastCommit`,
              value: r,
              type: 'String',
            })
          }).catch(e => {
            console.log('createNodeField error ',e);
            throw e
          })
        }
      })
      .catch(e => {
        console.log('fileNode error ',e);
        Promise.resolve('N/A')
        // throw e
      })
  } else {
    return Promise.resolve()
  }
}

exports.createPages = async ({ graphql, actions }) => {
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
  return Promise.all(
    result.data.appco.apps.map(async node => {
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
        path: '/appco/' + node.appcoid + '/comment',
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
