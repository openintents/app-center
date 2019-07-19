import React from 'react'
import { graphql, navigate } from 'gatsby'
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Avatar,
  IconButton,
  Typography,
} from '@material-ui/core'
import AppIcon from '@material-ui/icons/Apps'
import GetAppIcon from '@material-ui/icons/Launch'
import Img from 'gatsby-image'
import { styles } from '../components/layout'

export const numberFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
export const commitFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
})

export const SmallAppDetails = ({
  description,
  lifetimeEarnings,
  lastCommit,
  openSourceUrl,
  showSourceLink,
  hideRewards,
}) => {
  const earnings = numberFormat.format(lifetimeEarnings)
  var lastUpdate = ''
  if (openSourceUrl) {
    const lastCommitDate = Date.parse(lastCommit)
    if (isNaN(lastCommitDate)) {
      lastUpdate = lastCommit
    } else {
      lastUpdate = commitFormat.format(lastCommitDate)
    }
  }
  return (
    <React.Fragment>
      <Typography component="span" variant="body2" color="textPrimary">
        {description}
        {!hideRewards && (
          <>
            <br />
            rewards: {earnings}{' '}
          </>
        )}
        {showSourceLink && openSourceUrl && (
          <>
            <br />
            <a href={openSourceUrl} style={styles.link}>
              Source code
            </a>
          </>
        )}     
        {showSourceLink && openSourceUrl && (
          <>
            <br />
            last update: {lastUpdate}
          </>
        )}
      </Typography>
    </React.Fragment>
  )
}

const App = ({ data, hideRewards, showSourceLink }) => {
  return (
    <ListItem
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
          <Avatar>
            <Img fixed={data.localFile.childImageSharp.fixed} />
          </Avatar>
        </ListItemAvatar>
      )}
      {(!data.localFile || !data.localFile.childImageSharp) && (
        <ListItemAvatar>
          <Avatar>
            <AppIcon style={styles.smallIcon} />
          </Avatar>
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
          showSourceLink,
        })}
      />

      {!data.hideDetailsLink && data.website && data.website.length > 0 && (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="Launch">
            <a href={data.website}>
              <GetAppIcon style={styles.smallIcon} />
            </a>
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}

export const query = graphql`
  fragment AppInformation on apps {
    appcoid: id__normalized
    name
    website
    lifetimeEarnings
    openSourceUrl
    fields {
      lastCommit
    }
    description
  }

  fragment AppIcon on apps {
    localFile {
      childImageSharp {
        fixed(width: 36, height: 36) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default App
