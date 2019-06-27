import React from 'react'
import { checkIsSignedIn } from '../services/blockstack'
import { navigate } from 'gatsby'

class PrivateRoute extends React.Component {
  state = {checking:true, signedIn:false}

  componentDidMount = () => {
    const { location } = this.props
    checkIsSignedIn().then(signedIn => {
      if (location.pathname !== `/data/login`) {
        if (!signedIn) {
          // If the user is not logged in, redirect to the login page.
          navigate(`/data/login`)
          return null
        } else {
          if (location.search && location.search.startsWith("?authResponse=")) {
            navigate(`/data`)
          }
        }
      }
      this.setState({checking:false, signedIn})
    })
  }

  render() {
    const { component: Component, location, ...rest } = this.props
    const {checking, signedIn} = this.state
    if (checking) {
      return <>...</>
    } else {
      return signedIn ? <Component {...rest} /> : null
    }
  }
}

export default PrivateRoute
