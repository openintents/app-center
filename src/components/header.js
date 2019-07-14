import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Search from './search'
import BlockstackProfile from './blockstackProfile'
import { Container, Typography, Grid } from '@material-ui/core'
import PrimarySearchAppBar from './AppBar'

const Header = ({
  siteTitle,
  siteDescription,
  siteSearchIndex,
  hideSearch,
}) => (
  <PrimarySearchAppBar searchIndex={siteSearchIndex.index} />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
