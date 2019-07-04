import React from 'react'
import { graphql, navigate } from 'gatsby'
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
} from '@material-ui/core'
import AppIcon from '@material-ui/icons/Apps'
import GetAppIcon from '@material-ui/icons/Launch'
import Img from 'gatsby-image'
import { styles } from './layout';

export const numberFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
export const commitFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
})
const App = ({ data, hideRewards, showSourceLink }) => {
  const earnings = numberFormat.format(data.lifetimeEarnings)
  var lastUpdate = ''
  if (data.openSourceUrl) {
    const lastCommitDate = Date.parse(data.fields.lastCommit)
    if (isNaN(lastCommitDate)) {
      lastUpdate = data.fields.lastCommit
    } else {
      lastUpdate = commitFormat.format(lastCommitDate)
    }
  }

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
            <AppIcon iconStyle={styles.smallIcon}/>
          </Avatar>
        </ListItemAvatar>
      )}

      <ListItemText
        primary={<b>{data.name}</b>}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {showSourceLink && data.openSourceUrl && (
                <>
                  <a href={data.openSourceUrl}>{data.openSourceUrl}</a>
                  <br />
                </>
              )}
              {data.description}
            </Typography>
            <Typography component="span" variant="body2">
              {!hideRewards && (
                <>
                  <br />
                  rewards: {earnings}{' '}
                </>
              )}
              {showSourceLink && data.openSourceUrl && (
                <>
                  <br />
                  last update: {lastUpdate}
                </>
              )}
            </Typography>
          </React.Fragment>
        }
      />

      {!data.hideDetailsLink && data.website && data.website.length > 0 && (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="Launch">
            <a href={data.website}>
              <GetAppIcon iconStyle={styles.smallIcon}/>
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
        fixed(width: 24, height: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default App
