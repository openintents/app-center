import { graphql } from 'gatsby'
import OutAppList from '../../components/outAppList'

export const query = graphql`
  query out201908 {
    lastmonth: allAppminingresultsforauditXlsxJuly19(
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
    thismonth: allAppminingresultsforauditXlsxAugust19(
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
  }
`

export default OutAppList({ month: 'August 2019' })
