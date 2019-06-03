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
      content.message = `Hello, ${user.decentralizedID &&
        user.username && user.profile.name}`
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
        <span>Navigate the app: </span>
        <Link to="/app/">Main</Link>
        {` `}
        <Link to="/app/profile">Profile</Link>
        {` `}
        {signedIn ? (
          <a
            href="/"
            onClick={event => {
              event.preventDefault()
              logout(() => navigate(`/app/login`))
            }}
          >
            Logout
          </a>
        ) : (
          <Link to="/app/login">Login</Link>
        )}
      </nav>
    </div>
  )
}
}
