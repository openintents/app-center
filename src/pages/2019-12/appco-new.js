import { graphql } from 'gatsby'
import NewAppList from '../../components/newAppList'

export const query = graphql`
  query new201912 {
    thismonth: allAppmining201912AuditXlsxResults(
      filter: { Score_Last_Round: { in: [null, ""] }, Average_Score: { ne: null } }
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

export default NewAppList({ month: 'December 2019' })
