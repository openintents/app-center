import React from 'react'
import { navigate } from 'gatsby'
import {
  Typography,
  Container,
  Button,
  CardHeader,
  CardContent,
  CardActions,
  Card,
} from '@material-ui/core'
import AppsIcon from '@material-ui/icons/Apps'
import CommentIcon from '@material-ui/icons/Comment'
import LockIcon from '@material-ui/icons/Lock'
import DBIcon from '@material-ui/icons/Storage'
import { styles, LayoutContext } from '../components/layout'
import BlockstackAvatar from '../components/blockstackAvatar'
import { getAppBucketUrl } from 'blockstack'

class Main extends React.Component {
  static contextType = LayoutContext

  state = { storageLocation: null }

  componentDidMount() {
    if (window.location.hash === '#apps') {
      navigate('/data/apps')
    } else if (window.location.hash === '#comments') {
      navigate('/data/comments')
    }
  }

  render() {
    const { isSignedIn, user } = this.context

    if (!isSignedIn) {
      return null
    }
    if (isSignedIn) {
      getAppBucketUrl(user.hubUrl, user.appPrivateKey).then(storageLocation =>
        this.setState({ storageLocation })
      )
    }
    const { storageLocation } = this.state
    return (
      <Card style={{ margin: 4 }}>
        <CardHeader
          title={<>Data owned by {user.profile.name}</>}
          avatar={<BlockstackAvatar />}
        />
        <CardContent>
          <Container style={{ paddingTop: 4 }}>
            <LockIcon style={styles.smallIcon} />
            <Typography variant="body1">
              {user.username && (
                <>
                  All data is secured with blockstack id: <b>{user.username}</b>
                </>
              )}
              {!user.username && (
                <>
                  All data is secured with the following address:{' '}
                  <b>{user.identityAddress}</b>
                </>
              )}
            </Typography>

            <DBIcon style={styles.smallIcon} />
            <Typography variant="body1">
              Reviews and all data is stored on: <b>{storageLocation}</b>
            </Typography>
          </Container>
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={() => navigate('/data/comments')}>
            <CommentIcon style={styles.smallIcon} /> Manage comments
          </Button>{' '}
          <Button color="primary" onClick={() => navigate('/data/apps')}>
            <AppsIcon style={styles.smallIcon} /> Manage app
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default Main
