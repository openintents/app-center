import React from 'react'
import { graphql, navigate } from 'gatsby'
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  IconButton,
  Typography,
  Container,
} from '@material-ui/core'
import AppsIcon from '@material-ui/icons/Apps'
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
            Rewards: {earnings}{' '}
          </>
        )}
        {showSourceLink && openSourceUrl && (
          <>
            <br />
            <a
              href={openSourceUrl}
              style={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code
            </a>
          </>
        )}
        {showSourceLink && openSourceUrl && (
          <>
            <br />
            Last update: {lastUpdate}
          </>
        )}
      </Typography>
    </React.Fragment>
  )
}

export function renderAuthors(allAuthors) {
  if (allAuthors) {
    const countAuthors = allAuthors.edges.length - 1
    var separator = null
    return allAuthors.edges.map((e, index) => {
      if (index < countAuthors) {
        separator = ', '
      } else {
        separator = null
      }
      return (
        <React.Fragment key={e.node.username}>
          <a href={`/u/${e.node.username}`}>{e.node.profile.name}</a>
          {separator}
        </React.Fragment>
      )
    })
  } else {
    return null
  }
}

export function renderAuthorsInList(allAuthors, appcoid) {
  if (allAuthors) {
    var separator = null

    return allAuthors.edges
      .filter(e => e.node.apps.indexOf(appcoid) >= 0)
      .map((e, index, array) => {
        if (index < array.length - 1) {
          separator = ', '
        } else {
          separator = null
        }
        return (
          <React.Fragment key={e.node.username}>
            {e.node.profile.name}
            {separator}
          </React.Fragment>
        )
      })
  } else {
    return null
  }
}

const App = ({ data, hideRewards, showSourceLink, allAuthors }) => {
  const authors = renderAuthorsInList(allAuthors, parseInt(data.appcoid, 10))
  const hideDetailsLink =
    'hideDetailsLink' in data ? data.hideDetailsLink : false
  return (
    <ListItem
      className={'appItem'}
      dense
      alignItems="flex-start"
      button={!hideDetailsLink}
      onClick={() => {
        if (!hideDetailsLink) {
          navigate(`/appco/${data.appcoid}#reviews`)
        }
      }}
    >
      {data.localFile && data.localFile.childImageSharp && (
        <ListItemAvatar>
          <Container style={{ margin: '0px 4px' }}>
            <Img fixed={data.localFile.childImageSharp.fixed} />
          </Container>
        </ListItemAvatar>
      )}
      {(!data.localFile || !data.localFile.childImageSharp) && (
        <ListItemAvatar>
          <Container style={{ margin: '0px 4px' }}>
            <AppsIcon style={styles.smallIcon} />
          </Container>
        </ListItemAvatar>
      )}

      <ListItemText
        primary={
          <>
            <b>{data.name}</b>{' '}
            <Typography component="span" variant="body2">
              <em>{authors}</em>
            </Typography>
          </>
        }
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
            <a href={data.website} target="_blank" rel="noopener noreferrer">
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
      authors
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

  fragment AppBigIcon on apps {
    localFile {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }

  fragment AppPublisher on AppPublishersJson {
    username
    profile {
      name
    }
    apps
  }
`

export default App
