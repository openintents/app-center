import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Search from './search'
import BlockstackProfile from './blockstackProfile'
import { Container, Typography, Grid } from '@material-ui/core'

const Header = ({
  siteTitle,
  siteDescription,
  siteSearchIndex,
  hideSearch,
}) => (
  <Container
    style={{
      background: '#3f51b5',
      paddingTop: 1.45 + `rem`,
      color: 'white',
    }}
  >
    <Grid container>
      <Grid item sm={8} xs={12}>
        <Typography variant="h3">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            {siteTitle}
          </Link>
        </Typography>
        <Typography variant="body2">{siteDescription}</Typography>
        {!hideSearch && <Search searchIndex={siteSearchIndex.index} />}
      </Grid>
      <Grid item sm={4} xs={12}>
        <BlockstackProfile />
      </Grid>
    </Grid>
  </Container>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
