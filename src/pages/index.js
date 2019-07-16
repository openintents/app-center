import React from 'react'
import { Link } from 'gatsby'

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
import AllComments from '../components/allComments'
import { styles } from '../components/layout'
import { AppCoIcon } from '../components/image'
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
class IndexPage extends React.Component {
  render() {
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
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <Link to="/appco-foss/">Open Source apps</Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <Link to="/appco-noss/">Closed Source apps</Link>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <AppCoMonth
              title="App Mining (June 2019)"
              path="2019-06"
              date="6th July 2019"
            />
            <AppCoMonth
              title="App Mining (May 2019)"
              path="2019-05"
              date="5th May 2019"
            />
            <AppCoMonth
              title="App Mining (April 2019)"
              path="2019-04"
              date="3rd April 2019"
            />
            <AppCoMonth
              title="App Mining (March 2019)"
              path="2019-03"
              date="3rd April 2019"
            />
            <AppCoMonth
              title="App Mining (February 2019)"
              path="2019-02"
              date="3rd April 2019"
            />
            <AppCoMonth
              title="App Mining (January 2019)"
              path="2019-01"
              date="3rd April 2019"
            />
            <AppCoMonth
              title="App Mining (December 2018)"
              path="2018-12"
              date="3rd April 2019"
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

export default IndexPage
