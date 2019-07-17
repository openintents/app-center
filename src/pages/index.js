import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
} from '@material-ui/core'
import FossIcon from '@material-ui/icons/FolderOpen'
import NossIcon from '@material-ui/icons/Folder'
import AllComments from '../components/allComments'
import { styles } from '../components/layout'
import PersonalData from '../components/personalData'
import AppCoMonth from '../components/appcoMonth'
import Post from '../components/post'

export default ({ data }) => {
  return (
    <Layout>
      <SEO
        title="OI App Center"
        keywords={[`app center`, `application`, `blockstack`]}
        meta={[
          {
            name: `og:image`,
            content: data.ogImage.childImageSharp.fluid.src,
          },
        ]}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Card style={{ margin: 4 }} theme="dark">
            <CardHeader title="Browse currrent Blockstack apps" />

            <CardContent>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <Typography align="center">
                    <Link to="/appco-foss/">
                      <FossIcon style={styles.smallIcon} />
                      <br />
                      Open Source apps
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="center">
                    <Link to="/appco-noss/">
                      <NossIcon style={styles.smallIcon} />
                      <br />
                      Closed Source apps
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <AppCoMonth
            title="App Mining (June 2019)"
            path="2019-06"
            date="July 06, 2019"
          />
          <Post node={data.allMarkdownRemark.edges[0].node} />
          <AppCoMonth
            title="App Mining (May 2019)"
            path="2019-05"
            date="May 05, 2019"
          />
          <AppCoMonth
            title="App Mining (April 2019)"
            path="2019-04"
            date="April 03, 2019"
          />
          <AppCoMonth
            title="App Mining (March 2019)"
            path="2019-03"
            date="April 03, 2019"
          />
          <AppCoMonth
            title="App Mining (February 2019)"
            path="2019-02"
            date="April 03, 2019"
          />
          <AppCoMonth
            title="App Mining (January 2019)"
            path="2019-01"
            date="April 03, 2019"
          />
          <AppCoMonth
            title="App Mining (December 2018)"
            path="2018-12"
            date="April 03, 2019"
            newOnly
          />
          <Typography variant="body2">
            <a href="https://docs.blockstack.org/develop/mining_intro.html">
              Read more about the App Mining program
            </a>
          </Typography>
        </div>
        <div
          style={{
            paddingLeft: '3rem',
          }}
        >
          <PersonalData />
          <AllComments />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
