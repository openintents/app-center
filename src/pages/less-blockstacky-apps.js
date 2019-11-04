import { graphql } from 'gatsby'
import AppCoList from '../components/appcoList'

export const query = graphql`
  query lessPrivate {
    allApps(filter: { miningReady: { eq: true } }, sort: { fields: [name] }) {
      totalCount
      edges {
        node {
          ...AppInformation
          ...AppIcon
        }
      }
    }
    thisMonth: allAppmining201910AuditXlsxOctAudit(
      filter: { Final_Score: { ne: null } }
      sort: { fields: [NIL_Theta], order: [DESC] }
    ) {
      totalCount
      edges {
        node {
          App_ID: App_Id
          NIL_Theta
        }
      }
    }
    maxNILScore: allAppmining201910AuditXlsxOctAudit(
      limit: 1
      filter: { Final_Score: { ne: null } }
      sort: { fields: [NIL_Theta], order: [DESC] }
    ) {
      edges {
        node {
          score: NIL_Theta
        }
      }
    }
  }
`

export const hasNotFullNILScore = (appNode, thisMonth, maxNILScore) => {
  const maxNILScoreF = parseFloat(maxNILScore)
  const filteredMetaData = thisMonth.edges.filter(
    e =>
      parseInt(e.node.App_ID) === appNode.appcoid &&
      parseFloat(e.node.NIL_Theta) < maxNILScoreF
  )
  return filteredMetaData.length > 0
}

export default AppCoList({
  title: 'Less Blockstacky apps',
  filter: (appNode, data) =>
    hasNotFullNILScore(appNode, data.thisMonth, data.maxNILScore.edges[0].node.score),
})
