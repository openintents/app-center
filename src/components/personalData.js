import React, { Component } from 'react'
import { Link } from 'gatsby'

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
  Box,
  Container,
} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Note'
import AppsIcon from '@material-ui/icons/Apps'
import { styles } from './layout'
import BlockstackProfile from './blockstackProfile'
import { checkIsSignedIn, getUser } from '../app/services/blockstack'

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
      content = (
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
      )
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
      <Card style={{ margin: 4 }}>
        <CardHeader avatar={<BlockstackProfile />} />
        {content}
        <CardContent />
      </Card>
    )
  }
}

export default PersonalData
