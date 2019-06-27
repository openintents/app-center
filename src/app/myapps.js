import React from 'react'
import { getUser, saveMyData, loadMyData } from './services/blockstack'
import AppSelector from './components/AppSelector'

class MyApps extends React.Component {
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
        {loading && <>Loading...</>}
        {!loading && (
          <AppSelector
            myApps={myApps}
            onSubmitApps={values => this.saveMyApps(values)}
          />
        )}
      </>
    )
  }
}

export default MyApps
