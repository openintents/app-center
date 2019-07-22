import React, { Component } from 'react'
import {
  getUser,
  redirectToSignIn,
  checkIsSignedIn,
} from '../app/services/blockstack'
import { Avatar } from '@material-ui/core'
import AccountIcon from '@material-ui/icons/AccountBox'
import { BlockstackButton } from 'react-blockstack-button'
import { navigateTo } from 'gatsby'
import { styles } from './layout'

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
    let  variant = this.props.variant
    if (!variant) {
      variant = "light"
    }

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
            onClick={() => navigateTo('data')}
          />
        )
      } else {
        return (
          <Avatar
            onClick={() => navigateTo('data')}
            style={{ cursor: 'pointer' }}
          >
            <AccountIcon style={styles.smallIcon} />
          </Avatar>
        )
      }
    } else {
      return <BlockstackButton variant={variant} onClick={() => this.signIn()} />
    }
  }
}

export default BlockstackProfile
