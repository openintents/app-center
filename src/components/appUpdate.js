import React from 'react'

import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import LaunchIcon from '@material-ui/icons/Launch'
import ReadIcon from '@material-ui/icons/Subject'

import AppIcon from './appIcon'
import { StaticQuery, navigate, graphql } from 'gatsby'

export default ({ link, title, date, description, appcoId, apiComment }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          apps: allApps {
            edges {
              node {
                ...AppInformation
                ...AppIcon
              }
            }
          }
        }
      `}
      render={data => {
        let apps
        let app, actionName, appcoid, icon
        if (apiComment) {
          description = apiComment.comment.toString()
          date = new Date(apiComment.createdAt).toLocaleDateString()
          apps = data.apps.edges.filter(
            e => e.node.website === apiComment.object
          )
          if (apps && apps.length === 1) {
            app = apps[0]
            title = app.node.name
            appcoid = app.node.appcoid
          } else {
            title = `Update for ${apiComment.object}`
          }
          link = apiComment.object
          actionName = 'Try now'
          icon = <LaunchIcon />
        } else {
          appcoid = parseInt(appcoId)
          apps = data.apps.edges.filter(e => e.node.appcoid === appcoid)
          if (apps && apps.length === 1) {
            app = apps[0]
          }
          actionName = 'Read more'
          icon = <ReadIcon />
        }

        return (
          <Card style={{ marginTop: 4, marginLeft: 4, marginBottom: 12, marginRight: 4 }}>
            <CardHeader
              title={title}
              subheader={date}
              avatar={<AppIcon app={app} />}
            />
            <CardContent>
              <Typography>{description}</Typography>
            </CardContent>
            {(link || appcoid) && (
              <CardActions>
                {link && (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      window.location.href = link
                    }}
                  >
                    {icon}
                    {actionName}
                  </Button>
                )}
                {appcoid && (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      navigate(`/appco/${appcoid}/comment`)
                    }}
                  >
                    <StarIcon />
                    Rate now
                  </Button>
                )}
              </CardActions>
            )}
          </Card>
        )
      }}
    />
  )
}
