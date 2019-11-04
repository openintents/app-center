import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core'
import AppsIcon from '@material-ui/icons/Apps'
import UserIcon from '@material-ui/icons/AccountCircle'
import SEO from '../components/seo'
import { APP_CENTER_URL } from '../components/constants'

const Publisher = ({ data, allApps }) => {
  console.log(data)
  const name = (data.profile && data.profile.name) || data.username
  return (
    <ListItem>
      <ListItemAvatar style={{ margin: 8 }}>
        {data.localFile && (
          <Img
            style={{ borderRadius: '50%', margin: '0,4,0' }}
            fixed={data.localFile.childImageSharp.fixed}
          />
        )}
        {!data.localFile && <UserIcon style={{ width: 64, height: 64 }} />}
      </ListItemAvatar>
      <ListItemText>
        <Typography>
          <a href={`/u/${data.username}`}>{name}</a>
        </Typography>
        {data.apps &&
          data.apps.map(appcoid => {
            const apps = allApps.filter(app => app.appcoid === appcoid)
            const icon =
              apps.length > 0 &&
              apps[0].localFile &&
              apps[0].localFile.childImageSharp ? (
                <Img
                  style={{ margin: 4 }}
                  fixed={apps[0].localFile.childImageSharp.fixed}
                />
              ) : (
                <AppsIcon style={{ margin: 4, width: 36, height: 36 }} />
              )
            return (
              <a href={`/appco/${appcoid}`} key={`${data.username}${appcoid}`}>
                {icon}
              </a>
            )
          })}
      </ListItemText>
    </ListItem>
  )
}
const Publishers = ({ data }) => {
  return (
    <Layout>
      <SEO
        title="App Publishers | OI App Center"
        keywords={[`app center`, `applications`, `blockstack`, `developer`]}
        meta={[
          {
            property: 'og:image',
            content: `${APP_CENTER_URL}/${data.ogImage.childImageSharp.fluid.src}`,
          },
        ]}
      />
      <Typography variant="h3">App Publishers</Typography>
      <List dense>
        <ListItem>
          <ListItemText>
            Total number: {data.allAuthors.totalCount}
          </ListItemText>
        </ListItem>
      </List>
      <List>
        {data.allAuthors.edges.map(function(d, idx) {
          return (
            <Publisher
              key={idx}
              data={d.node}
              allApps={data.allApps.edges.map(e => e.node)}
            />
          )
        })}
      </List>
    </Layout>
  )
}

export const query = graphql`
  query publishers {
    allAuthors: allAppPublishersJson {
      totalCount
      edges {
        node {
          username
          profile {
            name
            account {
              service
              identifier
            }
            apps {
              https___chat_openintents_org
              https___app_dmail_online
              https___www_stealthy_im
              https___debutapp_social
              https___app_gitix_org
            }
          }
          apps
          localFile {
            childImageSharp {
              fixed(width: 64, height: 64) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }

    allApps {
      edges {
        node {
          ...AppInformation
          ...AppIcon
        }
      }
    }
    contactApps: allApps(
      filter: { id__normalized: { in: [924, 1318, 174, 955, 1754] } }
    ) {
      edges {
        node {
          appcoid: id__normalized
          localFile {
            childImageSharp {
              fixed(width: 16, height: 16) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
    ogImage: file(relativePath: { eq: "hero-img.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Publishers
