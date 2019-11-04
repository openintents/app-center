import React from 'react'
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Grid,
  CardActions,
  Button,
} from '@material-ui/core'
import SEO from '../components/seo'
import Layout from '../components/layout'
import { APP_CENTER_URL } from '../components/constants'
import { graphql, navigate } from 'gatsby'
import SearchIcon from '@material-ui/icons/Search'

const CategoryPage = ({ path, title, subheader, description }) => (
  <Card style={{ padding: 8, margin: 8, height: '95%' }}>
    <CardHeader title={title} subheader={subheader} />

    <CardContent>{description}</CardContent>
    <CardActions>
      <Button size="small" color="primary" onClick={() => navigate(path)}>
        <SearchIcon />
        Explore
      </Button>
    </CardActions>
  </Card>
)
const Explore = ({ data }) => (
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
    <Typography variant="h3" style={{ margin: 8 }}>
      Explore by Category
    </Typography>
    <Grid container>
      <Grid item xs={12} sm={6}>
        <CategoryPage
          path="/appco-foss"
          title="Open Source Apps"
          description="These apps provide a link to the source code of the app. Note, there is no verification that the code is indeed the code that was deployed."
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CategoryPage
          path="/appco-noss"
          title="Closed Source Apps"
          description="These apps do not provide any details about how the app is working."
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CategoryPage
          path="/publishers"
          title="Apps sorted by Authors"
          description="App authors can choose to publish their blockstack ID in the app's web manifest for everybody to review"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CategoryPage
          path="/anonymous"
          title="Apps without Authors"
          description="The list contains apps where we couldn't find or contact the app author."
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CategoryPage
          path="/more-blockstacky-apps"
          title="More Blockstacky Apps"
          description="These apps have received full score by the Digital Rights reviewer."
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CategoryPage
          path="/less-blockstacky-apps"
          title="Less Blockstacky Apps"
          description="These apps have NOT received full score by the Digital Rights reviewer."
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CategoryPage
          path="/android"
          title="Android Apps"
          description="Some of these Android apps have also a web app and iOS app"
        />
      </Grid>
    </Grid>
  </Layout>
)
export const query = graphql`
  query {
    ogImage: file(relativePath: { eq: "hero-img.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
export default Explore
