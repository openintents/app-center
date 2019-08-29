import React, { Component } from 'react'
import { navigate } from 'gatsby'

import {
  Typography,
  Card,
  CardContent,
  Container,
  Button,
  CardActions,
} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Note'
import AppsIcon from '@material-ui/icons/Apps'
import ExitIcon from '@material-ui/icons/ExitToApp'
import { styles } from './layout'
import BlockstackProfile from './blockstackProfile'
import { checkIsSignedIn, getUser, logout } from '../app/services/blockstack'

class PersonalData extends Component {
  state = {
    isSignedIn: false,
    loading: true,
    userData: null,
  }
  componentDidMount() {
    checkIsSignedIn().then(signedIn => {
      this.setState({
        loading: false,
        isSignedIn: signedIn,
        userData: getUser(),
      })
    })
  }
  render() {
    const { isSignedIn } = this.state
    let content
    if (isSignedIn) {
      content = null
    } else {
      content = (
        <Container>
          <Typography>
            <b>Blockstack</b> is a decentralized computing network for apps that
            #cantbeevil.
          </Typography>
        </Container>
      )
    }
    return (
      <>
        <Typography variant="h5">Profile</Typography>
        <Card style={{ margin: 4 }}>
          <CardContent>
            <Container align="center">
              <BlockstackProfile />
            </Container>
            {content}
          </CardContent>
          {!isSignedIn && (
            <CardActions>
              <Container>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate('data/login')}
                >
                  Learn more
                </Button>
              </Container>
            </CardActions>
          )}
          {isSignedIn && (
            <CardActions>
              <Container align="center">
                <Button
                  color="primary"
                  onClick={() => navigate('/data/#reviews')}
                >
                  <CommentIcon style={styles.smallIcon} />
                  Comments
                </Button>
                <br />
                <Button color="primary" onClick={() => navigate('/data/#apps')}>
                  <AppsIcon style={styles.smallIcon} />
                  Apps
                </Button>
                <br />
                <Button color="primary" onClick={() => logout()}>
                  <ExitIcon style={styles.smallIcon} />
                  Logout
                </Button>
              </Container>
            </CardActions>
          )}
        </Card>
      </>
    )
  }
}

export default PersonalData
