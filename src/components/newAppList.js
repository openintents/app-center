import React from 'react'
import App from './app'
import Layout from './layout'
import { Typography, List } from '@material-ui/core'

const NewAppList = ({ month, matchByName }) => ({ data }) => {
  let appcoid
  const newApps = data.thismonth.edges.map(function(d) {
    var appcodata
    if (!matchByName) {
      appcoid = parseInt(d.node.appcoid)
      appcodata = data.allApps.edges.filter(e => e.node.appcoid === appcoid)
    } else {
      appcodata = data.allApps.edges.filter(e => e.node.name === d.node.name)
    }
    const app =
      appcodata.length > 0
        ? {
            lifetimeEarnings: 0,
            website: appcodata.length > 0 ? appcodata[0].node.website : null,
            ...d.node,
            ...appcodata[0].node,
          }
        : {
            lifetimeEarnings: 0,
            ...d.node,
          }
          console.log(app)

    return (
      <App
        key={app.appcoid}
        data={app}
        hideRewards
        allAuthors={data.allAuthors}
      />
    )
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
