import { graphql } from 'gatsby'
import AppCoList from '../components/appcoList'

export const query = graphql`
  query android {
    allApps(
      filter: {
        miningReady: { eq: true }
        fields: { error: { in: ["", null] } }
      }
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
          android
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

const hasAndroidPackage = (appNode, metaDataJson) => {
  return (
    metaDataJson.edges.filter(
      e => parseInt(e.node.id) === appNode.appcoid && e.node.android
    ).length > 0
  )
}

export default AppCoList({
  title: 'All Android Blockstack Apps',
  showSourceLink: false,
  filter: (appNode, data) =>
    hasAndroidPackage(appNode, data.allAppMetaDataJson),
})
