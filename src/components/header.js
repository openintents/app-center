import { StaticQuery, Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Search from './search'
const Header = ({ siteTitle, siteDescription, siteSearchIndex }) => (
  <div
    style={{
      background: `#3f51b5`,
      marginBottom: `1.45rem`,
      color: `white`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      {siteDescription}
      <Search searchIndex={siteSearchIndex.index} />
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
