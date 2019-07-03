import { graphql } from 'gatsby'
import OutAppList from '../../components/outAppList';

export const query = graphql`
  query out201903 {
    lastmonth:allAppminingresultsXlsxFebruary2019 {
      totalCount
      edges {
        node {
          appcoid: App_Id
          name: Name
          Final_Score
        }
      }
    }
    thismonth:allAppminingresultsXlsxMarch2019 {
      edges {
        node {
          appcoid: App_ID
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

export default OutAppList({title: "March 2019"})
