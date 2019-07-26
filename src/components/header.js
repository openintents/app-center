import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Search from './search'
import { Container, Typography, Grid } from '@material-ui/core'
import PrimarySearchAppBar from './AppBar'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  header: {
    paddingTop: theme.spacing(1),
    color: theme.palette.common.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    color: theme.palette.common.white,
    textDecoration: 'none',
  },
  titleIcon: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
})

const Header = ({
  siteTitle,
  siteSearchIndex,
  hideSearch,
  fixedIcon,
  classes,
}) => (
  <PrimarySearchAppBar searchIndex={siteSearchIndex.index} />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
  siteSearchIndex: PropTypes.object,
  hideSearch: PropTypes.bool,
  fixedIcon: PropTypes.object,
  classes: PropTypes.object.isRequired,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default withStyles(styles)(Header)
