import { graphql } from 'gatsby'
import OutAppList from '../../components/outAppList'

export const query = graphql`
  query out201909 {
    lastmonth: allAppminingresultsforauditXlsxAugust19(
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
    thismonth: allAppmining201909AuditXlsxAuditResults(
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

export default OutAppList({ month: 'September 2019' })
