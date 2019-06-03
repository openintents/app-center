import React from 'react'
import { graphql } from 'gatsby'
import App from '../../components/app'
import Layout from '../../components/layout'

const AppCo = ({ data }) => {
  return (
    <Layout>
      <h1>New Blockstack Apps (December 2018)</h1>
      <ul>
        <li>Total number: {data.thismonth.totalCount}</li>
      </ul>
      <ul>
        {data.thismonth.edges.map(function(d, idx) {
          const appcodata = data.allApps.edges.filter(
            e => e.node.appcoid === d.node.appcoid
          )
          console.log(appcodata)
          const app = {
            lifetimeEarnings: 0,
            website: appcodata.length > 0 ? appcodata[0].node.website : null,
            ...d.node,
          }
          console.log(app.website)
          return (
            <li key={idx}>
              <App data={app} hideRewards />
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query new201812 {
    thismonth:allAppminingresultsXlsxDecember2018 {
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
        }
      }
    }
  }
`

export default AppCo
