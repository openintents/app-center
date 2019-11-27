import { graphql } from 'gatsby'
import OutAppList from '../../components/outAppList'

export const query = graphql`
  query out201911 {
    lastmonth: allAppmining201910AuditXlsxOctAudit(
      filter: { Final_Score: { ne: null } }
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
    thismonth: allAppmining201911AuditXlsxResults(
      filter: { Final_Score: { ne: null } }
    ) {
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

export default OutAppList({ month: 'November 2019' })
