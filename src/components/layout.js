import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import './layout.css'
import { createMuiTheme, Container } from '@material-ui/core'
import { checkIsSignedIn, getUser } from '../app/services/blockstack'
import { ThemeProvider } from '@material-ui/styles'
import PrimaryAppBar from './appBar'
import Footer from './footer'

export const styles = {
  tinyIcon: {
    width: 12,
    height: 12,
  },
  smallIcon: {
    width: 36,
    height: 36,
  },
  bigIcon: {
    width: 100,
    height: 100,
  },
  link: {
    textDecoration: 'none',
    color: '#72a7cf',
  },
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#72a7cf',
    },
    secondary: {
      main: '#cf9a72',
    },
  },
})

const NotSignedIn = {
  checking: false,
  user: null,
  isSignedIn: false,
}
export const LayoutContext = React.createContext(NotSignedIn)

const Layout = ({ children, hideSearch }) => {
  const [signIn, setSignIn] = useState({ ...NotSignedIn, checking: true })

  useEffect(() => {
    checkIsSignedIn().then(signedIn => {
      if (signedIn) {
        setSignIn({ checking: false, user: getUser(), isSignedIn: true })
      } else {
        setSignIn(NotSignedIn)
      }
    })
  }, [])
  return (
    <LayoutContext.Provider value={signIn}>
      <StaticQuery
        query={graphql`
          query SiteHeaderQuery {
            site {
              siteMetadata {
                title
                description
              }
            }
            siteSearchIndex {
              index
            }
            icon: file(
              sourceInstanceName: { eq: "images" }
              relativePath: { eq: "icon.png" }
            ) {
              childImageSharp {
                fixed(width: 64, height: 64) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        `}
        render={data => (
          <ThemeProvider theme={theme}>
            <PrimaryAppBar
              siteSearchIndex={data.siteSearchIndex}
              fixedIcon={data.icon.childImageSharp.fixed}
              hideSearch={hideSearch}
            />
            <Container
              style={{
                margin: `0 auto`,
                background: '#EEE',
                padding: `0px 1rem 1.5rem`,
              }}
            >
              {children}
              <footer>
                <Footer />
              </footer>
            </Container>
          </ThemeProvider>
        )}
      />
    </LayoutContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hideSearch: PropTypes.bool,
}

export default Layout
