import { graphql } from 'gatsby'
import AppCoList, { hasNossReason } from '../components/appcoList'

export const query = graphql`
  query noss {
    allApps(
      filter: { openSourceUrl: { in: ["", null] }, miningReady: { eq: true } }
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
  title: 'All Closed Source Blockstack Apps',
  showSourceLink: false,
  filter: (appNode, data) => hasNossReason(appNode, data.allAppMetaDataJson),
})
