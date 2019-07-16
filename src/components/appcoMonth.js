import React from 'react'
import { Link } from 'gatsby'

import { Typography, Card, CardHeader, CardContent } from '@material-ui/core'
import AppCoIcon from './appCoIcon'

export default ({ title, path, newOnly, date }) => {
  return (
    <Card style={{ margin: 4 }}>
      <CardHeader title={title} subheader={date} avatar={<AppCoIcon />} />
      <CardContent>
        <Typography>
          New results have been added to the app details. Please also explore
          all <Link to={`/${path}/appco-new/`}>new apps</Link>.
          {!newOnly && (
            <>
              {' '}
              Some apps have been retired. See this{' '}
              <Link to={`/${path}/appco-out/`}> month's list</Link>
            </>
          )}
        </Typography>
      </CardContent>
    </Card>
  )
}
