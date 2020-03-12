import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import Search from './search'
import BlockstackAvatar from './blockstackAvatar'
import { navigate } from 'gatsby'
import { logout, redirectToSignIn } from '../app/services/blockstack'
import Img from 'gatsby-image'
import { LayoutContext, styles } from './layout'
import { BlockstackButton } from 'react-blockstack-button'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  websiteTitle: {
    cursor: 'pointer',
  },
  appBar: {
    background: 'rgb(238, 238, 238)',
  },
}))

export default function PrimaryAppBar({
  siteSearchIndex,
  fixedIcon,
  hideSearch,
}) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const { isSignedIn, checking } = useContext(LayoutContext)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null)
  }

  function handleMenuClose() {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate('/data/#reviews')}>Reviews</MenuItem>
      <MenuItem onClick={() => navigate('/data/#apps')}>Apps</MenuItem>
      <MenuItem onClick={() => logout()}>Logout</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => navigate('/data/#reviews')}>Reviews</MenuItem>
      <MenuItem onClick={() => navigate('/data/#apps')}>Apps</MenuItem>
      <MenuItem onClick={() => logout()}>Logout</MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={() => navigate('/')}
            edge="start"
            className={classes.menuButton}
            aria-label="Icon"
          >
            <Img fixed={fixedIcon} alt="icon" />
          </IconButton>

          <div>
            <Typography
              onClick={() => navigate('/')}
              className={classes.title}
              variant="h5"
              noWrap
            >
              All about Blockstack Apps
            </Typography>
            <Typography
              onClick={() => navigate('/')}
              className={classes.title}
              variant="body2"
              noWrap
            >
              Apps that respect your digital life
            </Typography>
          </div>
          {!hideSearch && (
            <div className={classes.search}>
              <Search
                searchIndex={siteSearchIndex.index}
                suggestionSelectedCallback={suggestion => {
                  if (suggestion.category === 'App Publisher') {
                    navigate('/u/' + suggestion.username)
                  } else {
                    navigate('/appco/' + suggestion.appcoid)
                  }
                }}
                suggestionValueChangedCallback={() => {}}
              />
            </div>
          )}
          <div className={classes.grow} />
          {isSignedIn && (
            <>
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="end"
                  aria-label="Account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <BlockstackAvatar />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="Show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon style={{ ...styles.smallIcon, color: `#000` }} />
                </IconButton>
              </div>
            </>
          )}
          {!isSignedIn && !checking && (
            <div className={classes.sectionDesktop}>
              <BlockstackButton onClick={() => redirectToSignIn()} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      {isSignedIn && (
        <>
          {renderMobileMenu}
          {renderMenu}
        </>
      )}
    </div>
  )
}
