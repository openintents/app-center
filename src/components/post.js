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
import ReadIcon from '@material-ui/icons/Subject'

export default ({ node, date }) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <Card
      key={node.fields.slug}
      style={{ marginTop: 4, marginLeft: 4, marginBottom: 12, marginRight: 4 }}
    >
      <CardHeader title={title} subheader={date} avatar={<AppCenterIcon />} />
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
          <ReadIcon />
          Read more
        </Button>
      </CardActions>
    </Card>
  )
}
