import { graphql } from 'gatsby'
import OutAppList from '../../components/outAppList'

export const query = graphql`
  query out202002 {
    lastmonth: allAppmining202001AuditXlsxResults(
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
    thismonth: allAppmining202002AuditXlsxResults(
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

export default OutAppList({ month: 'Feburary 2020' })
