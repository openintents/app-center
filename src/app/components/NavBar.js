import React, { useContext } from 'react'
import { Link, navigate } from 'gatsby'
import { logout } from '../services/blockstack'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { LayoutContext } from '../../components/layout'

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flex: '1',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.secondary.light}`,
      backgroundColor: theme.palette.secondary.main,
      padding: 4,
      marginLeft: `-1rem`,
      marginRight: '-1rem',
    },
  }
}

const NavBar = ({ classes }) => {
  let { checking, isSignedIn } = useContext(LayoutContext)

  const content = { message: '', login: true }
  if (checking) {
    content.message = 'stacking blocks...'
  } else if (isSignedIn) {
    content.message = null
  } else {
    content.message = 'You are not logged in'
  }
  return (
    <div className={classes.root}>
      <Typography component="span">{content.message}</Typography>

      <nav>
        <Typography>
          <Link to="/data/">Overview</Link>
          {` `}
          <Link to="/data/comments">Comments</Link>
          {` `}
          <Link to="/data/apps">Apps</Link>
          {` `}
          {isSignedIn ? (
            <a
              href="/data/login"
              onClick={event => {
                event.preventDefault()
                logout(() => navigate(`/data/login`))
              }}
            >
              Logout
            </a>
          ) : (
            <Link to="/data/login">Login</Link>
          )}
        </Typography>
      </nav>
    </div>
  )
}

export default withStyles(styles)(NavBar)
