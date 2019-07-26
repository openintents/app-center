import React, { Component } from 'react'
import { getUser, checkIsSignedIn } from '../app/services/blockstack'
import { Avatar } from '@material-ui/core'
import AccountIcon from '@material-ui/icons/AccountBox'
import { styles } from './layout'

class BlockstackAvatar extends Component {
  state = {
    isSignedIn: false,
  }

  componentDidMount() {
    checkIsSignedIn().then(signedIn => {
      this.setState({ isSignedIn: signedIn, userData: getUser() })
    })
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
        return <Avatar alt={userData.username} src={avatar} />
      } else {
        return (
          <Avatar>
            <AccountIcon style={styles.smallIcon} />
          </Avatar>
        )
      }
    } else {
      return (
        <Avatar>
          <AccountIcon style={styles.smallIcon} />
        </Avatar>
      )
    }
  }
}

export default BlockstackAvatar
