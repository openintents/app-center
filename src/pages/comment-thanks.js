import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Container, Typography } from '@material-ui/core'

const CommentThanks = () => (
  <Layout hideSearch>
    <SEO title="OI App Center" />
    <Container spacing={2}>    
      <Typography variant="h4">
        You can close this page now.
      </Typography>
      <Typography>Thank you for visiting OI App Center!</Typography>
    </Container>
  </Layout>
)

export default CommentThanks
