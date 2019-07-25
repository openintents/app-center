import React, { useContext } from 'react'
import { Avatar, CircularProgress } from '@material-ui/core'
import AccountIcon from '@material-ui/icons/AccountBox'
import { styles, LayoutContext } from './layout'

export default () => {
  const { isSignedIn, user: userData, checking } = useContext(LayoutContext)

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
  } else if (checking) {
    return (
      <Avatar>
        <CircularProgress size={24} />
      </Avatar>
    )
  } else {
    return (
      <Avatar>
        <AccountIcon style={styles.smallIcon} />
      </Avatar>
    )
  }
}
