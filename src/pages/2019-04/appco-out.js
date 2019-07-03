import { graphql } from 'gatsby'
import OutAppList from '../../components/outAppList';


export const query = graphql`
  query out201904 {
    lastmonth:allAppminingresultsXlsxMarch2019 {
      totalCount
      edges {
        node {
          appcoid: App_ID
          name: App_Name
          Final_Score
        }
      }
    }
    thismonth:allAppminingresultsXlsxApril2019 {
      edges {
        node {
          appcoid: App_ID
          name: App_name
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

export default OutAppList({title: "April 2019"})
