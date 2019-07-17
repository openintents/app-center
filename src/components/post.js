import React from 'react'
import { navigate } from 'gatsby'

import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core'
import AppCenterIcon from './appCenterIcon'

export default ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <Card key={node.fields.slug} style={{ margin: 4 }}>
      <CardHeader
        title={title}
        subheader={node.frontmatter.date}
        avatar={<AppCenterIcon />}
      />
      <CardContent>
        <Typography>{node.excerpt}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            navigate(node.fields.slug)
          }}
        >
          Read more
        </Button>
      </CardActions>
    </Card>
  )
}
