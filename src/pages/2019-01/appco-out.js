import React from 'react'
import { graphql } from 'gatsby'
import App from '../../components/app'
import Layout from '../../components/layout'

const AppCo = ({ data }) => {
  const retiredApps = data.lastmonth.edges
    .filter(function(d) {
      const appcodata = data.thismonth.edges.filter(
        e => e.node.name === d.node.name
      )
      return appcodata.length === 0
    })
    .map((d, idx) => {
      return (
        <li key={idx}>
          <App data={d.node} hideRewards hideDetailsLink/>
        </li>
      )
    })

  return (
    <Layout>
      <h1>Retired Blockstack Apps (January 2019)</h1>
      <ul>
        <li>Total number: {retiredApps.length}</li>
      </ul>
      <ul>{retiredApps}</ul>
    </Layout>
  )
}

export const query = graphql`
  query out201901 {
    lastmonth:allAppminingresultsXlsxDecember2018 {
      totalCount
      edges {
        node {
          name: App_Name
          Final_Score
        }
      }
    }
    thismonth:allAppminingresultsXlsxJanuary2019 {
      edges {
        node {
          appcoid: App_Id
          name: App_Name
          Final_Score
        }
      }
    }
  }
`

export default AppCo
