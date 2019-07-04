import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'
import { Typography } from '@material-ui/core'
import { getApiServer } from '../app/services/blockstack'

export const styles = {
  smallIcon: {
    width: 27,
    height: 27,
  },
}

const Layout = ({ children }) => (
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
      }
    `}
    render={data => (
      <>
        <Header
          siteTitle={data.site.siteMetadata.title}
          siteDescription={data.site.siteMetadata.description}
          siteSearchIndex={data.siteSearchIndex}
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
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
