import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { getUser, checkIsSignedIn } from '../app/services/blockstack'
import {
  Container,
  List,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faInstagram,
  faHackerNews,
  faLinkedin,
  faGithub,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons'

import Img from 'gatsby-image'
import SEO from '../components/seo'
import App from '../components/app'
import AppIcon from '../components/appIcon'

const social = [
  'twitter',
  'linkedin',
  'github',
  'hackernews',
  'instagram',
  'facebook',
]

const contactApps = [
  {
    key: 'https___app_dmail_online',
    appcoid: 1318,
    url: 'https://app.dmail.online/compose?to=%USERNAME%&subject=Blockstack',
  },
  {
    key: 'https___chat_openintents_org',
    appcoid: 924,
    url: 'https://chat.openintents.org',
  },
  {
    key: 'https___www_stealthy_im',
    appcoid: 174,
    url: 'https://www.stealthy.im',
  },
]

class Publisher extends Component {
  state = {
    loadingUser: true,
  }

  componentDidMount() {
    checkIsSignedIn().then(isSignedIn => {
      if (isSignedIn) {
        this.setState({
          loadingUser: false,
          isSignedIn: true,
          userData: getUser(),
        })
      } else {
        this.setState({ isSignedIn: false, loadingUser: false })
      }
    })
  }

  accountAsLink(account) {
    switch (account.service.toLowerCase()) {
      case 'twitter':
        return `https://twitter.com/${account.identifier}`
      case 'linkedin':
        return `https://linkedin.com/${account.identifier}`
      case 'github':
        return `https://github.com/${account.identifier}`
      case 'hackernews':
        return `https://news.ycombinator.com/user?id=${account.identifier}`
      case 'instagram':
        return `https://instagram.com/${account.identifier}`
      case 'facebook':
        return `https://facebook.com/${account.identifier}`
      default:
        return `https://duckduckgo.com/?q=${account.identifier}`
    }
  }

  accountAsText(account) {
    switch (account.service.toLowerCase()) {
      case 'twitter':
        return <FontAwesomeIcon icon={faTwitter} color="black" size="1x" />
      case 'linkedin':
        return <FontAwesomeIcon icon={faLinkedin} color="black" size="1x" />
      case 'github':
        return <FontAwesomeIcon icon={faGithub} color="black" size="1x" />
      case 'hackernews':
        return <FontAwesomeIcon icon={faHackerNews} color="black" size="1x" />
      case 'instagram':
        return <FontAwesomeIcon icon={faInstagram} color="black" size="1x" />
      case 'facebook':
        return (
          <FontAwesomeIcon icon={faFacebookSquare} color="black" size="1x" />
        )
      default:
        return <>{account.service}</>
    }
  }

  contactAsLink(app, username) {
    return app.url.replace('%USERNAME%', username)
  }

  contactAsText(app) {
    const contactApp = this.props.data.contactApps.edges.filter(
      edge => edge.node.appcoid === app.appcoid
    )
    if (contactApp && contactApp.length > 0) {
      console.log(contactApp)
      return <AppIcon app={contactApp[0]} />
    } else {
      return <AppIcon />
    }
  }

  renderSocialAccounts(data) {
    if (data.appPublishersJson.profile.account) {
      return social.map(socialService => {
        return data.appPublishersJson.profile.account
          .filter(a => a.service.toLowerCase() === socialService)
          .map(a => {
            return (
              <a
                key={a.service}
                href={this.accountAsLink(a)}
                rel="noopener noreferrer"
                target="_blank"
                style={{ margin: 4 }}
              >
                {this.accountAsText(a)}
              </a>
            )
          })
      })
    } else {
      return null
    }
  }

  renderContactApps(data) {
    if (data.appPublishersJson.profile.apps) {
      return contactApps.map(app => {
        const isUsingApp = data.appPublishersJson.profile.apps[app.key]
        if (isUsingApp) {
          return (
            <a
              key={app.key}
              href={this.contactAsLink(app, data.appPublishersJson.username)}
              rel="noopener noreferrer"
              target="_blank"
              style={{ margin: 4 }}
            >
              {this.contactAsText(app)}
            </a>
          )
        } else {
          return null
        }
      })
    } else {
      return null
    }
  }

  render() {
    const { data } = this.props
    const accounts = this.renderSocialAccounts(data)
    const contacts = this.renderContactApps(data)

    return (
      <Layout>
        <SEO
          title={`${data.appPublishersJson.username} | Blockstack Developer`}
          description={`${data.appPublishersJson.profile.name}'s Profile`}
          keywords={['developer', 'application', 'blockstack']}
        />

        <Container>
          <Card style={{ margin: 4 }}>
            <CardHeader
              avatar={
                <Img
                  style={{ borderRadius: '50%' }}
                  fixed={data.appPublishersJson.localFile.childImageSharp.fixed}
                />
              }
              title={data.appPublishersJson.profile.name}
              subheader={data.appPublishersJson.username}
            />
            <CardContent>
              {contacts} {accounts}
            </CardContent>
          </Card>
          <List>
            {data.allApps.edges.map(e => {
              return <App key={e.node.appcoid} data={e.node} />
            })}
          </List>
        </Container>
      </Layout>
    )
  }
}

export const query = graphql`
  query($apps: [Int], $username: String) {
    allApps(filter: { id__normalized: { in: $apps } }) {
      edges {
        node {
          ...AppInformation
          ...AppBigIcon
        }
      }
    }
    appPublishersJson(username: { eq: $username }) {
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
        }
      }
      localFile {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    contactApps: allApps(filter: { id__normalized: { in: [924, 1318, 174] } }) {
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
  }
`

export default Publisher
