import { graphql } from 'gatsby'
import NewAppList from '../../components/newAppList'



export const query = graphql`
  query new201903 {
    thismonth: allAppminingresultsXlsxMarch2019(
      filter: { Score_Last_Round: { eq: null }, Average_Score: { ne: null } }
    ) {
      totalCount
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

export default NewAppList({ month: 'March 2019' })
