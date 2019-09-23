import React from 'react'
import App from './app'
import Layout from './layout'
import { List, Typography } from '@material-ui/core'

const OutAppList = ({ month }) => ({ data }) => {
  let appcoid
  const retiredApps = data.lastmonth.edges
    .filter(function(d) {
      const appcodata = data.thismonth.edges.filter(
        e => e.node.appcoid === d.node.appcoid
      )
      return appcodata.length === 0
    })
    .map((d, idx) => {
      appcoid = parseInt(d.node.appcoid)
      const appcodata = data.allApps.edges.filter(
        e => e.node.appcoid === appcoid
      )

      const app =
        appcodata.length > 0
          ? {
              lifetimeEarnings: 0,
              website: appcodata.length > 0 ? appcodata[0].node.website : null,
              ...appcodata[0].node,
              ...d.node,
            }
          : { hideDetailsLink: true, ...d.node }

      return (
        <App key={idx} data={app} hideRewards allAuthors={data.allAuthors} />
      )
    })

  return (
    <Layout>
      <Typography variant="h4">Retired Blockstack Apps ({month})</Typography>
      <Typography>Total number: {retiredApps.length}</Typography>
      <List>{retiredApps}</List>
    </Layout>
  )
}

export default OutAppList
