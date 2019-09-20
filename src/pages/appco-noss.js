import { graphql } from 'gatsby'
import AppCoList from '../components/appcoList'

export const query = graphql`
  query noss {
    allApps(
      filter: {
        openSourceUrl: {
          in: [
            ""
            null
            "https://github.com/zincwork/contracts"
            "https://github.com/kkomaz/debut"
            "https://github.com/springrole"
            "https://github.com/dmailonline"
            "https://github.com/blockcred"
            "https://github.com/blackholeorganization"
            "https://github.com/danparamov/mila-crm"
            "https://github.com/KevinNTH"
            "https://gitlab.com/trovenow"
          ]
        }
        miningReady: { eq: true }
      }
      sort: { fields: [name] }
    ) {
      totalCount
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
          username
          profile {
            name
          }
          apps
        }
      }
    }
  }
`

export default AppCoList({
  title: 'All Closed Source Blockstack Apps',
  showSourceLink: false,
})
