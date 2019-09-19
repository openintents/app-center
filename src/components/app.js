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
            <a href={openSourceUrl} style={styles.link}>
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

export function renderAuthors(data) {
  if (data.fields && data.fields.authors) {
    try {
      const authors = JSON.parse(data.fields.authors)

      if (authors.length === 0) {
        return null
      } else {
        return authors.map(a => (
          <>
            <a key={a} href={`/u/${a}`}>
              {a}
            </a>{' '}
          </>
        ))
      }
    } catch (e) {
      console.log('error', e)
      return null
    }
  } else {
    return null
  }
}

export function renderAuthorsAsText(data) {
  if (data.fields && data.fields.authors) {
    try {
      const authors = JSON.parse(data.fields.authors)

      if (authors.length === 0) {
        return null
      } else {
        return authors.map(a => <>{a} </>)
      }
    } catch (e) {
      console.log('error', e)
      return null
    }
  } else {
    return null
  }
}

const App = ({ data, hideRewards, showSourceLink }) => {
  const authors = renderAuthorsAsText(data)
  return (
    <ListItem
      className={'appItem'}
      dense
      alignItems="flex-start"
      button={!data.hideDetailsLink}
      onClick={() => {
        if (!data.hideDetailsLink) {
          navigate(`/appco/${data.appcoid}#reviews`)
        }
      }}
    >
      {data.localFile && data.localFile.childImageSharp && (
        <ListItemAvatar>
          <Container style={{margin: "0px 4px"}}>
          <Img fixed={data.localFile.childImageSharp.fixed} />
          </Container>
        </ListItemAvatar>
      )}
      {(!data.localFile || !data.localFile.childImageSharp) && (
        <ListItemAvatar>
          <AppsIcon style={styles.smallIcon} />
        </ListItemAvatar>
      )}

      <ListItemText
        primary={
          <>
            <b>{data.name}</b> {authors}
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
`

export default App
