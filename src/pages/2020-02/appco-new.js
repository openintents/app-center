import { graphql } from 'gatsby'
import NewAppList from '../../components/newAppList'

export const query = graphql`
  query new202002 {
    thismonth: allAppmining202002AuditXlsxResults(
      filter: {
        Previous_Score: { in: [null, ""] }
        Average_Score: { ne: null }
      }
    ) {
      totalCount
      edges {
        node {
          appcoid: App_Id
          name: App_Name
          Final_Score
        }
      }
    }
    allApps {
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
          ...AppPublisher
        }
      }
    }
  }
`

export default NewAppList({ month: 'February 2020' })
