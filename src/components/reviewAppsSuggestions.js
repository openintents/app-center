import React, { Component, useContext } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import {
  Typography,
  Card,
  CardContent,
  Container,
  Button,
  CardActions,
  CircularProgress,
  List,
} from '@material-ui/core'
import { LayoutContext } from './layout'
import App from './app'

const ReviewAppsSuggestions = ({ data }) => {
  const { isSignedIn, checking } = useContext(LayoutContext)
  if (!isSignedIn) {
    return null
  } else {
    const data = useStaticQuery(graphql`
      query appSuggestions {
        allApps(sort: { fields: [lifetimeEarnings], order:[DESC] }) {
          edges {
            node {
              ...AppInformation
              ...AppIcon
            }
          }
        }
      }
    `)

    return (
      <Card style={{ margin: 4 }}>
        <CardContent>
          <Container align="center">
            {!checking && (
              <Typography variant="h5">Rate some of these apps</Typography>
            )}
            {checking && <CircularProgress size={36} />}
          </Container>
          {!checking && (
            <List>
              {data.allApps.edges.slice(0,3).map(function(d, idx) {
                return (
                  <App
                    key={d.node.appcoid}
                    data={d.node}
                    showSourceLink={false}
                    hideRewards
                  />
                )
              })}
            </List>
          )}
        </CardContent>
      </Card>
    )
  }
}

export default ReviewAppsSuggestions
