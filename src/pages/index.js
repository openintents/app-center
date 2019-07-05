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
} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Note'
import AppsIcon from '@material-ui/icons/Apps'

const AppCoMonth = ({ title, path, newOnly }) => {
  return (
    <>
      <Typography>{title}</Typography>
      <List dense>
        <ListItem>
          <ListItemText>
            <Link to={`/${path}/appco-new/`}>New apps</Link>
          </ListItemText>
        </ListItem>
        {!newOnly && (
          <ListItem>
            <ListItemText>
              <Link to={`/${path}/appco-out/`}>Retired apps</Link>
            </ListItemText>
          </ListItem>
        )}
      </List>
    </>
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
            <Typography>Current Blockstack apps</Typography>
            <List dense>
              <ListItem>
                <ListItemText>
                  <Link to="/appco-foss/">Open Source apps</Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link to="/appco-noss/">Closed Source apps</Link>
                </ListItemText>
              </ListItem>
            </List>
            <AppCoMonth title="App Mining (June 2019)" path="2019-06" />
            <AppCoMonth title="App Mining (May 2019)" path="2019-05" />
            <AppCoMonth title="App Mining (April 2019)" path="2019-04" />
            <AppCoMonth title="App Mining (March 2019)" path="2019-03" />
            <AppCoMonth title="App Mining (February 2019)" path="2019-02" />
            <AppCoMonth title="App Mining (January 2019)" path="2019-01" />
            <AppCoMonth
              title="App Mining (December 2018)"
              path="2018-12"
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
              borderLeft: '#5DBCD2',
              borderLeftStyle: 'dashed',
              paddingLeft: '3rem',
            }}
          >
            <Typography>
              <b>Personal Data</b>
              <br />
              (requires login with Blockstack)
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CommentIcon />
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
                    <AppsIcon />
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
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
