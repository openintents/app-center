import { graphql } from 'gatsby'
import NewAppList from '../../components/newAppList'


export const query = graphql`
  query new201904 {
    thismonth: allAppminingresultsXlsxApril2019(
      filter: { Score_Last_Round: { eq: null }, Average_Score: { ne: null } }
    ) {
      totalCount
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
    allAuthors: allAppPublishersJson {
      edges {
        node {
          ...AppPublisher
        }
      }
    }

  }
`

export default NewAppList({ month: 'April 2019' })
