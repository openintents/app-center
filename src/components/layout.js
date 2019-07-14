import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'
import { Typography, createMuiTheme } from '@material-ui/core'
import { getApiServer } from '../app/services/blockstack'
import { ThemeProvider } from '@material-ui/styles'

export const styles = {
  smallIcon: {
    width: 27,
    height: 27,
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

const Layout = ({ children, hideSearch }) => (
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
        file(
          sourceInstanceName: { eq: "images" }
          relativePath: { eq: "icon.png" }
        ) {
          childImageSharp {
            fixed(width: 24, height: 24) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <Header
          siteTitle={data.site.siteMetadata.title}
          siteDescription={data.site.siteMetadata.description}
          siteSearchIndex={data.siteSearchIndex}
          hideSearch={hideSearch}
          fixedIcon={data.file.childImageSharp.fixed}
        />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          {children}
          <footer>
            <Typography variant="body2" style={{ fontSize: 'small' }}>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a> and{' '}
              <a href="https://blockstack.org">Blockstack</a>. You can{' '}
              <a href="https://gitlab.com/friedger/app-center">
                view the source here
              </a>
              <br />
              Radiks Server: {getApiServer()}
            </Typography>
          </footer>
        </div>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
