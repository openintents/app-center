import React from 'react'
import { graphql, navigate } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import {
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core'
import AllComments from '../components/allComments'
import LoggedOut from '../components/loggedOut'
import ReviewAppsSuggestions from '../components/reviewAppsSuggestions'
import HelpCommunity from '../components/helpCommunity'
import ReadIcon from '@material-ui/icons/Subject'
import { APP_CENTER_URL } from '../components/constants'
import { NewsPosts } from '../components/newsPosts'

export default ({ data }) => {
  return (
    <Layout>
      <SEO
        title="OI App Center"
        keywords={[`app center`, `application`, `blockstack`]}
        meta={[
          {
            property: 'og:image',
            content: `${APP_CENTER_URL}/${data.ogImage.childImageSharp.fluid.src}`,
          },
        ]}
      />
      <Grid container spacing={2} style={{ paddingTop: 40 }}>
        <Grid item xs={12} sm={8}>
          <ReviewAppsSuggestions />
          <LoggedOut />
          <HelpCommunity />
          <AllComments />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" align="center">
            News and Updates
          </Typography>
          <NewsPosts data={data} size={4} />
          <Card
            style={{
              margin: 4,
            }}
          >
            <CardHeader title="Archive" />
            <CardContent>
              <Typography>
                Read more about update from developers, blog posts and news from
                the Blockstack ecosystem
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  navigate(`/archive`)
                }}
              >
                <ReadIcon />
                Visit Archive
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
    ogImage: file(relativePath: { eq: "hero-img.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
