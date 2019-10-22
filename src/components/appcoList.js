import React from 'react'
import App from '../components/app'
import Layout from '../components/layout'
import { numberFormat } from '../components/app'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'

export const hasNossReason = (appNode, allAppMetaDataJson) => {
  const filteredMetaData = allAppMetaDataJson.edges.filter(
    e => parseInt(e.node.id) === appNode.appcoid && e.node.nossReason
  )
  return filteredMetaData.length > 0
}

const AppCoList = ({ title, showSourceLink, filter }) => ({ data }) => {
  const allApps = data.allApps.edges.filter(e => {
    if (filter) {
      return filter(e.node, data)
    } else {
      return true
    }
  })
  return (
    <Layout>
      <Typography variant="h3">{title}</Typography>
      <List dense>
        <ListItem>
          <ListItemText>Total number: {allApps.length}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Total rewards:{' '}
            {numberFormat.format(
              allApps.reduce((sum, d) => sum + d.node.lifetimeEarnings, 0)
            )}
          </ListItemText>
        </ListItem>
      </List>
      <List>
        {allApps.map(function(d, idx) {
          return (
            <App
              key={idx}
              data={d.node}
              showSourceLink={showSourceLink}
              allAuthors={data.allAuthors}
            />
          )
        })}
      </List>
    </Layout>
  )
}

export default AppCoList
