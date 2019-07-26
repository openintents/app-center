import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core'
import { navigate } from 'gatsby'

const CommentThanks = () => (
  <Layout hideSearch>
    <SEO title="OI App Center" />

    <Card>
      <CardContent>
        <Typography variant="h4">You can close this page now.</Typography>
        <Typography>Thank you for visiting OI App Center!</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => navigate('/')}>
          Do more reviews
        </Button>
      </CardActions>
    </Card>
  </Layout>
)

export default CommentThanks
