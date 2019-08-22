import { graphql } from 'gatsby'
import NewAppList from '../../components/newAppList'

export const query = graphql`
  query new201908 {
    thismonth: allAppminingresultsforauditXlsxAugust19(
      filter: { Score_Last_Round: { eq: null }, Average_Score: { ne: null } }
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
  }
`

export default NewAppList({ month: 'August 2019' })
