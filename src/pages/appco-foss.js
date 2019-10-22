import { graphql } from 'gatsby'
import AppCoList, { hasNossReason } from '../components/appcoList'

export const query = graphql`
  query foss {
    allApps(
      filter: { openSourceUrl: { nin: ["", null] }, miningReady: { eq: true } }
      sort: { fields: [fields___lastCommit, name], order: [DESC, ASC] }
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
          nossReason
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

export default AppCoList({
  title: 'All Open Source Blockstack Apps',
  showSourceLink: false,
  filter: (appNode, data) => !hasNossReason(appNode, data.allAppMetaDataJson),
})
