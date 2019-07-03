import React from 'react'
import App from './app'
import Layout from './layout'
import { Typography, List } from '@material-ui/core'

const NewAppList = ({ month }) => ({ data }) => {
  let appcoid
  const newApps = data.thismonth.edges.map(function(d) {
    appcoid = parseInt(d.node.appcoid)
    const appcodata = data.allApps.edges.filter(e => e.node.appcoid === appcoid)

    const app =
      appcodata.length > 0
        ? {
            lifetimeEarnings: 0,
            website: appcodata.length > 0 ? appcodata[0].node.website : null,
            ...appcodata[0].node,
            ...d.node,
          }
        : {
            lifetimeEarnings: 0,
            ...d.node,
          }
    return <App key={app.appcoid} data={app} hideRewards />
  })

  return (
    <Layout>
      <Typography variant="h4">New Blockstack Apps ({month})</Typography>
      <Typography>Total number: {data.thismonth.totalCount}</Typography>
      <List>{newApps}</List>
    </Layout>
  )
}

export default NewAppList
