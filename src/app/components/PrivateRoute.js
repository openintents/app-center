import React from 'react'
import { checkIsSignedIn } from '../services/auth'
import { navigate } from 'gatsby'

class PrivateRoute extends React.Component {
  state = {checking:true, signedIn:false}

  componentDidMount = () => {
    const { location } = this.props
    checkIsSignedIn().then(signedIn => {
      if (location.pathname !== `/app/login`) {
        if (!signedIn) {
          // If the user is not logged in, redirect to the login page.
          navigate(`/app/login`)
          return null
        } else {
          if (location.search && location.search.startsWith("?authResponse=")) {
            navigate(`/app`)
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
