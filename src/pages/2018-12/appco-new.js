import { graphql } from 'gatsby'
import NewAppList from '../../components/newAppList'

export const query = graphql`
  query new201812 {
    thismonth: allAppminingresultsXlsxDecember2018 {
      totalCount
      edges {
        node {
          appcoid: id
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

export default NewAppList({ month: 'December 2018' })
