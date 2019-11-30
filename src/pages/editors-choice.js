import { graphql } from 'gatsby'
import AppCoList from '../components/appcoList'

export const query = graphql`
  query editorsChoice {
    allApps(
      filter: {
        id__normalized: {
          in: [1595, 1571, 1183, 1453, 2098, 1858, 1459, 2064, 1439, 1744]
        }
      }
      sort: { fields: [name], order: [ASC] }  
    ) {
      totalCount
      edges {
        node {
          ...AppInformation
          ...AppIcon
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
  title: "Editor's Choice",
  showSourceLink: false,
})
