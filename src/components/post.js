import React from 'react'
import { Link } from 'gatsby'

import { Typography, Card, CardHeader, CardContent } from '@material-ui/core'
import AppCenterIcon from './appCenterIcon'

export default ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <Card key={node.fields.slug} style={{ margin: 4 }}>
      <CardHeader
        title={
          <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
            {title}
          </Link>
        }
        subheader={node.frontmatter.date}
        avatar={<AppCenterIcon />}
      />
      <CardContent>
        <Typography>{node.excerpt}</Typography>
      </CardContent>
    </Card>
  )
}
