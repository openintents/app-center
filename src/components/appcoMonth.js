import React from 'react'

import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core'
import AppCoIcon from './appCoIcon'
import NewAppsIcon from '@material-ui/icons/PlaylistAdd'
import RetiredAppsIcon from '@material-ui/icons/DeleteSweep'
import ReadIcon from '@material-ui/icons/Subject'
import { navigate } from 'gatsby'

export default ({ title, path, newOnly, date, link }) => {
  return (
    <Card
      style={{ marginTop: 4, marginLeft: 4, marginBottom: 12, marginRight: 4 }}
    >
      <CardHeader title={title} subheader={date} avatar={<AppCoIcon />} />
      <CardContent>
        <Typography>
          New results have been added to the app details. Please also explore
          all new apps.
          {!newOnly && (
            <>
              {' '}
              Some apps have been retired and do not take part in the App Mining
              program anymore.
            </>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => navigate(`/${path}/appco-new/`)}
        >
          <NewAppsIcon />
          New Apps
        </Button>
        {!newOnly && (
          <Button
            size="small"
            color="primary"
            onClick={() => navigate(`/${path}/appco-out/`)}
          >
            <RetiredAppsIcon />
            Retired Apps
          </Button>
        )}
        {link && (
          <Button size="small" color="secondary" href={link}>
            <ReadIcon />
            Read blog
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
