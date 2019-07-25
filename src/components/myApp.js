import React from 'react'
import { navigate } from 'gatsby'
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  IconButton,
} from '@material-ui/core'
import AppsIcon from '@material-ui/icons/Apps'
import DeleteIcon from '@material-ui/icons/RemoveCircle'
import Img from 'gatsby-image'
import { styles } from './layout'
import { SmallAppDetails } from './app'

const MyApp = ({ data, hideRewards, removeApp }) => {
  return (
    <ListItem
      className={'appItem'}
      dense
      alignItems="flex-start"
      button={!data.hideDetailsLink}
      onClick={() => {
        if (!data.hideDetailsLink) {
          navigate(`/appco/${data.appcoid}`)
        }
      }}
    >
      {data.localFile && data.localFile.childImageSharp && (
        <ListItemAvatar>
          <Img fixed={data.localFile.childImageSharp.fixed} />
        </ListItemAvatar>
      )}
      {(!data.localFile || !data.localFile.childImageSharp) && (
        <ListItemAvatar>
          <AppsIcon style={styles.smallIcon} />
        </ListItemAvatar>
      )}

      <ListItemText
        primary={<b>{data.name}</b>}
        secondary={SmallAppDetails({
          description: data.description,
          lifetimeEarnings: data.lifetimeEarnings,
          lastCommit: data.fields && data.fields.lastCommit,
          openSourceUrl: data.openSourceUrl,
          hideRewards,
          showSourceLink: true,
        })}
      />

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="remove"
          onClick={() => {
            removeApp(data)
          }}
        >
          <DeleteIcon style={styles.smallIcon} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default MyApp
