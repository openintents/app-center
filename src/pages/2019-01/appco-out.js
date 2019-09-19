import React from 'react'
import { graphql } from 'gatsby'
import App from '../../components/app'
import Layout from '../../components/layout'
import { List } from '@material-ui/core';

const AppCo = ({ data }) => {
  const retiredApps = data.lastmonth.edges
    .filter(function(d) {
      const appcodata = data.thismonth.edges.filter(
        e => e.node.name === d.node.name
      )
      return appcodata.length === 0
    })
    .map((d, idx) => {
      return <App key={idx} data={d.node} hideRewards hideDetailsLink />
    })

  return (
    <Layout>
      <h1>Retired Blockstack Apps (January 2019)</h1>
      <ul>
        <li>Total number: {retiredApps.length}</li>
      </ul>
      <List>{retiredApps}</List>
    </Layout>
  )
}

export const query = graphql`
  query out201901 {
    lastmonth: allAppminingresultsXlsxDecember2018 {
      totalCount
      edges {
        node {
          name: App_Name
          Final_Score
        }
      }
    }
    thismonth: allAppminingresultsXlsxJanuary2019 {
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
    allAuthors:allAppPublishersJson {
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

export default AppCo
