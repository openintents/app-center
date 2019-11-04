import { graphql } from 'gatsby'
import AppCoList from '../components/appcoList'

export const query = graphql`
  query anonymous {
    allApps(
      filter: { miningReady: { eq: true } }
      sort: { fields: [name] }
    ) {
      totalCount
      edges {
        node {
          ...AppInformation
          ...AppIcon
        }
      }
    }
    allAppMetaDataJson {
      edges {
        node {
          id
          authors
        }
      }
    }
    allAuthors: allAppPublishersJson {
      edges {
        node {
          username
          profile {
            name
          }
          apps
        }
      }
    }
  }
` 

export const hasNoAuthor = (appNode, allAppMetaDataJson) => {
  const filteredMetaData = allAppMetaDataJson.edges.filter(
    e => parseInt(e.node.id) === appNode.appcoid && (!e.node.authors || e.node.authors.length === 0)
  )
  return filteredMetaData.length > 0
}

export default AppCoList({
  title: 'Apps without known authors',
  filter: (appNode, data) => hasNoAuthor(appNode, data.allAppMetaDataJson),
})
