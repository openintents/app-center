import React from 'react'
import { Link, navigate } from 'gatsby'
import { getUser, checkIsSignedIn, logout } from '../services/blockstack'

export default class NavBar extends React.Component {
  state = {checking:true, signedIn:false}
  componentDidMount = () => {
      checkIsSignedIn().then(signedIn =>
        this.setState({checking:false, signedIn})
      )
    }

  render() {
  const content = { message: '', login: true }
  const {checking, signedIn} = this.state
  if (checking) {
    content.message = "stacking blocks..."
  } else if (signedIn) {
      const user = getUser()
      let name = user.profile && user.profile.name
      if (!name) {
        name = user.username
      }
      if (!name){
        name = user.decentralizedId
      } 
      content.message = `Hello, ${name} (${user.username})`
  } else {
      content.message = 'You are not logged in'
  }
  return (
    <div
      style={{
        display: 'flex',
        flex: '1',
        justifyContent: 'space-between',
        borderBottom: '1px solid #d1c1e0',
        backgroundColor: 'aliceblue',
      }}
    >
      <span>{content.message}</span>

      <nav>
        <Link to="/data/">Overview</Link>
        {` `}
        <Link to="/data/comments">My Comments</Link>
        {` `}
        <Link to="/data/apps">My Apps</Link>
        {` `}
        {signedIn ? (
          <a
            href="/"
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
      </nav>
    </div>
  )
}
}
