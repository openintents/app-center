import React, { Component } from 'react'
import {
  getUser,
  redirectToSignIn,
  checkIsSignedIn,
} from '../app/services/blockstack'
import { Avatar } from '@material-ui/core'
import AccountIcon from '@material-ui/icons/AccountBox'
import { BlockstackButton } from 'react-blockstack-button'
import { styles } from './layout'
import { navigate } from 'gatsby'


class BlockstackProfile extends Component {
  state = {
    isSignedIn: false,
    isLoading: true,
  }

  componentDidMount() {
    checkIsSignedIn().then(signedIn => {
      this.setState({ isSignedIn: signedIn, userData: getUser() })
    })
  }

  signIn() {
    redirectToSignIn()
  }

  render() {
    const { isSignedIn, userData } = this.state
    if (isSignedIn) {
      let avatars, avatar
      if (userData.profile && userData.profile.image) {
        avatars = userData.profile.image.filter(i => i.name === 'avatar')
      }
      if (avatars && avatars.length > 0) {
        avatar = avatars[0].contentUrl
      }
      if (avatar) {
        return (
          <Avatar
            alt={userData.username}
            src={avatar}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('data')}
          />
        )
      } else {
        return (
          <Avatar
            style={{ cursor: 'pointer', marginBottom: 1.45 + 'rem' }}
            onClick={() => navigate('data')}
          >
            <AccountIcon style={styles.smallIcon} />
          </Avatar>
        )
      }
    } else {
      return <BlockstackButton variant="light" onClick={() => this.signIn()} />
    }
  }
}

export default BlockstackProfile
