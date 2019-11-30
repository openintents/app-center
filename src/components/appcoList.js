import React from 'react'
import App from '../components/app'
import Layout from '../components/layout'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'

export const hasNossReason = (appNode, allAppMetaDataJson) => {
  const filteredMetaData = allAppMetaDataJson.edges.filter(
    e => parseInt(e.node.id) === appNode.appcoid && e.node.nossReason
  )
  return filteredMetaData.length > 0
}

const AppCoList = ({ title, showSourceLink, filter }) => ({ data }) => {
  const allApps = filter
    ? data.allApps.edges.filter(e => {
        return filter(e.node, data)
      })
    : data.allApps.edges
  return (
    <Layout>
      <Typography variant="h3">{title}</Typography>
      <List dense>
        <ListItem>
          <ListItemText>Number of apps: {allApps.length}</ListItemText>
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
