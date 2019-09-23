import { graphql } from 'gatsby'
import NewAppList from '../../components/newAppList'


export const query = graphql`
  query new201902 {
    thismonth: allAppminingresultsXlsxFebruary2019(
      filter: { Score_Last_Round: { eq: null }, Average: { ne: null } }
    ) {
      totalCount
      edges {
        node {
          appcoid: App_Id
          name: Name
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

export default NewAppList({ month: 'February 2019' })
