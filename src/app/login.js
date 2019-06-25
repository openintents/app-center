import React from 'react'
import { navigate } from 'gatsby'
import { handleLogin } from './services/blockstack'
import { Button } from '@material-ui/core';

class Login extends React.Component {
  componentDidMount() {
    const location = this.props
    if (location && location.location && !!location.location.search && location.location.search.startsWith("?authResponse=")) {
      navigate(`/app`)
    }
  }

  handleSubmit = () => handleLogin(user => navigate(`/app/profile`))
  render() {
    return (
      <>
        <h1>Log in</h1>
        <Button variant="outlined" onClick={this.handleSubmit}>log in</Button>
      </>
    )
  }
}

export default Login
