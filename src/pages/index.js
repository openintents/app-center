import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import {
  Typography,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Grid,
} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Note'
import AppsIcon from '@material-ui/icons/Apps'
import FossIcon from '@material-ui/icons/FolderOpen'
import NossIcon from '@material-ui/icons/Folder'
import AllComments from '../components/allComments'
import { styles } from '../components/layout'
import AppCenterIcon from '../components/appCenterIcon'
import AppCoIcon from '../components/appCoIcon'
import BlockstackProfile from '../components/blockstackProfile'

const AppCoMonth = ({ title, path, newOnly, date }) => {
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

const PersonalData = () => {
  return (
    <Card style={{ margin: 4 }}>
      <CardHeader avatar={<BlockstackProfile />} />
      <CardContent>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CommentIcon style={styles.smallIcon} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography>
                <Link to="/data/#comments">
                  <b>Manage your comments</b>
                </Link>{' '}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AppsIcon style={styles.smallIcon} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link to="/data/#apps">
                  <b>Manage your apps</b>
                </Link>
              }
              secondary="(For app publishers only)"
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

const Post = ({ node }) => {
  console.log(node)
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

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    return (
      <Layout>
        <SEO
          title="OI App Center"
          keywords={[`app center`, `application`, `blockstack`]}
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
}

export const indexQuery = graphql`
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
  }
`

export default IndexPage
