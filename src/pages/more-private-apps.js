import { graphql } from 'gatsby'
import AppCoList from '../components/appcoList'

export const query = graphql`
  query morePrivate {
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

export const hasFullNILScore = (appNode, thisMonth, maxNILScore) => {
  const filteredMetaData = thisMonth.edges.filter(
    e =>
      parseInt(e.node.App_ID) === appNode.appcoid &&
      thisMonth.edges[0].node.NIL_Theta == maxNILScore
  )
  return filteredMetaData.length > 0
}

export default AppCoList({
  title: 'More private apps',
  filter: (appNode, data) =>
    hasFullNILScore(
      appNode,
      data.thisMonth,
      data.maxNILScore.edges[0].node.score
    ),
})
