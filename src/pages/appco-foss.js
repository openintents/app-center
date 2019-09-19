import { graphql } from 'gatsby'
import AppCoList from '../components/appcoList'

export const query = graphql`
  query foss {
    allApps(
      filter: {
        openSourceUrl: {
          nin: [
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
          ]
        }
        miningReady: { eq: true }
      }
      sort: { fields: [fields___lastCommit, name], order: [DESC, ASC] }
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
  title: 'All Open Source Blockstack Apps',
  showSourceLink: false,
})
