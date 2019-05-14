const path = require("path");
const fetch = require("node-fetch")

getLastCommit = (openSourceUrl) => {
  console.log("opensource", openSourceUrl)
  if (openSourceUrl.startsWith("https://github.com/")) {
    const parts = openSourceUrl.substr(19).split("/")
    if (parts.length > 1) {
    const owner = parts[0]
    const repo = parts[1]
    const url = "https://api.github.com/repos/" + owner + "/" + repo +"/commits"
    console.log(url)
    return fetch(url).then(response => response.json(), () => "No json")
    .then(response => {
      if (response && response.length > 0) {
        console.log(response[0].commit.author.date)
        return response[0].commit.author.date
      } else {
        return "No commits found - " + response.message
      }
    }, () => {
      return "Error on commit requests"
    })
  } else {
    return Promise.resolve("Unsupported github url")
  }
  } else {
    return Promise.resolve("Unsupported source repo")
  }
}

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `apps` && node.openSourceUrl && node.openSourceUrl !== "") {
      const lastCommit = getLastCommit(node.openSourceUrl)
      return lastCommit.then(r => {
        console.log(node.name, r)

        createNodeField({
          node,
          name: `lastCommit`,
          value: r,
          type: "String"
        })

      })
  } else {
    return Promise.resolve()
  }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
        {
            appco {
                apps {
                    appcoid:id__normalized
                    name
                }
            }
        }
    `);
    return Promise.all(
        result.data.appco.apps.slice(0, 2).map(async node => {
          console.log(node)
            await createPage({
                path: "/appco/" + node.appcoid,
                component: path.resolve("./src/pages/appcodetails.js"),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    appcoid: node.appcoid
                }
            });
        })
    );
};
