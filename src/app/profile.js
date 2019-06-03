import React from 'react'
import { getUser, saveMyData, loadMyData } from './services/blockstack'
import AppSelector from './components/AppSelector'

class Profile extends React.Component {
  state = {
    myApps: {},
    loading: true,
  }

  componentDidMount() {
    loadMyData().then(content => {
      this.setState({ myApps: content.myApps, loading: false })
    })
  }

  saveMyApps(values) {
    return saveMyData({ myApps: values })
  }

  render() {
    const user = getUser()
    const { myApps, loading } = this.state

    return (
      <>
        <h1>Your profile</h1>
        <ul>
          <li>Name: {user.username && user.profile.name}</li>
          <li>E-mail: {user.email}</li>
        </ul>
        {!loading && (
          <AppSelector myApps={myApps} onSubmitApps={(values) => this.saveMyApps(values)} />
        )}
      </>
    )
  }
}

export default Profile
