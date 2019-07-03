import React from 'react'
import App from '../components/app'
import Layout from '../components/layout'
import { numberFormat } from '../components/app'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'

const AppCoList = ({ title, showSourceLink }) => ({ data }) => {
  return (
    <Layout>
      <Typography variant="h3">{title}</Typography>
      <List dense>
        <ListItem>
          <ListItemText>Total number: {data.allApps.totalCount}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Total rewards:{' '}
            {numberFormat.format(
              data.allApps.edges.reduce(
                (sum, d) => sum + d.node.lifetimeEarnings,
                0
              )
            )}
          </ListItemText>
        </ListItem>
      </List>
      <List>
        {data.allApps.edges.map(function(d, idx) {
          return <App key={idx} data={d.node} showSourceLink={showSourceLink} />
        })}
      </List>
    </Layout>
  )
}

export default AppCoList
