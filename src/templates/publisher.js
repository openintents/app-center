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
  Typography,
} from '@material-ui/core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config as faConfig } from '@fortawesome/fontawesome-svg-core'
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
import { APP_CENTER_URL } from '../components/constants'

faConfig.autoAddCss = false

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
  {
    key: 'https___debutapp_social',
    appcoid: 955,
    url: 'https://debutapp.social/%USERNAME%',
  },
  {
    key: 'https___app_gitix_org',
    appcoid: 1754,
    url: 'https://app.gitix.org/#/u/%USERNAME%',
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
        return (
          <FontAwesomeIcon
            icon={faTwitter}
            color="black"
            size="1x"
            fixedWidth
          />
        )
      case 'linkedin':
        return (
          <FontAwesomeIcon
            icon={faLinkedin}
            color="black"
            size="1x"
            fixedWidth
          />
        )
      case 'github':
        return (
          <FontAwesomeIcon icon={faGithub} color="black" size="1x" fixedWidth />
        )
      case 'hackernews':
        return (
          <FontAwesomeIcon
            icon={faHackerNews}
            color="black"
            size="1x"
            fixedWidth
          />
        )
      case 'instagram':
        return (
          <FontAwesomeIcon
            icon={faInstagram}
            color="black"
            size="1x"
            fixedWidth
          />
        )
      case 'facebook':
        return (
          <FontAwesomeIcon
            icon={faFacebookSquare}
            color="black"
            size="1x"
            fixedWidth
          />
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
      return <AppIcon app={contactApp[0]} />
    } else {
      return <AppIcon />
    }
  }

  renderSocialAccounts(data) {
    if (data.appPublishersJson.profile.account) {
      return social.map(socialService => {
        const socialAccount = data.appPublishersJson.profile.account.find(
          a => a.service.toLowerCase() === socialService
        )
        if (socialAccount) {
          return (
            <a
              key={socialAccount.service}
              href={this.accountAsLink(socialAccount)}
              rel="noopener noreferrer"
              target="_blank"
              style={{ margin: 4 }}
            >
              {this.accountAsText(socialAccount)}
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

  renderDonate(data) {
    if (data.appPublishersJson.profile.account) {
      const bitcoinAccount = data.appPublishersJson.profile.account.find(
        a => a.service.toLowerCase() === 'bitcoin'
      )
      const donateButtons = []
      if (bitcoinAccount) {
        donateButtons.push(
          <a
            key={bitcoinAccount.service}
            href={`https://blockchain.info/address/${bitcoinAccount.identifier}`}
            rel="noopener noreferrer"
            target="_blank"
            style={{ margin: 4 }}
          >
            Donate BTC
          </a>
        )
      }

      const etherumAccount = data.appPublishersJson.profile.account.find(
        a => a.service.toLowerCase() === 'ethereum'
      )
      if (etherumAccount) {
        donateButtons.push(
          <a
            key={etherumAccount.service}
            href={`https://etherscan.io/address/${etherumAccount.identifier}`}
            rel="noopener noreferrer"
            target="_blank"
            style={{ margin: 4 }}
          >
            Donate ETH
          </a>
        )
      }
      // for now, do not show donate buttons as blockstack browser
      // does not support editing crypto addresses
      //return <Typography>{donateButtons}</Typography>
      return null
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
    const donateButtons = this.renderDonate(data)
    const meta =
      data.appPublishersJson.localFile &&
      data.appPublishersJson.localFile.childImageSharp
        ? [
            {
              property: 'og:image',
              content: `${APP_CENTER_URL}/${data.appPublishersJson.localFile.childImageSharp.fixed.src}`,
            },
          ]
        : null

    return (
      <Layout>
        <SEO
          title={`${data.appPublishersJson.username} | Blockstack Developer`}
          description={`${data.appPublishersJson.profile.name}'s Profile`}
          keywords={['developer', 'application', 'blockstack']}
          meta={meta}
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
              {contacts} {accounts} {donateButtons}
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
          https___debutapp_social
          https___app_gitix_org
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
  }
`

export default Publisher
