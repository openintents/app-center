import React from 'react'
import {
  saveMyData,
  loadMyData,
  checkIsSignedIn,
  getUser,
} from './services/blockstack'
import AppSelector2 from './components/AppSelector2'
import { Typography, Container, CircularProgress } from '@material-ui/core'

class MyApps extends React.Component {
  state = {
    myApps: {},
    loading: true,
    username: null,
  }

  componentDidMount() {
    checkIsSignedIn().then(isSignedIn => {
      if (isSignedIn) {
        const user = getUser()
        this.setState({ username: user.username })
      }
    })
    loadMyData().then(content => {
      this.setState({ myApps: content.myApps || {}, loading: false })
    })
  }

  saveMyApps(values) {
    return saveMyData({ myApps: values })
  }

  render() {
    const { myApps, loading, username } = this.state

    return (
      <>
        {loading && (
          <Container style={{ margin: 40 }}>
            <CircularProgress size={36} />
            <Typography component="span"> Loading apps...</Typography>
          </Container>
        )}
        {!loading && (
          <AppSelector2
            myApps={myApps}
            username={username}
            onSubmitApps={values => this.saveMyApps(values)}
          />
        )}
      </>
    )
  }
}

export default MyApps
