import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { encryptContent, loadMyData } from './services/blockstack'

class Main extends React.Component {
  state = {
    message: 'My message',
    encryptedMessage: '',
    myApps: {},
    loading: true,
  }

  componentDidMount() {
    loadMyData().then(content => {
      this.setState({ myApps: content.myApps, loading: false })
    })
  }

  handleClick(event) {
    const encryptedMessage = encryptContent(this.state.message)
    this.setState({ encryptedMessage })
  }

  handleChange(event) {
    this.setState({ message: event.target.value })
  }

  renderApps(myApps, data) {
    const apps = []
    if (myApps) {
      Object.keys(myApps).forEach(key => {
        if (myApps[key]) {
          const appEditLink = `/appco-edit/${key.substr(4)}`
          const app = data.allApps.edges.filter(edge => {
            return edge.node.appcoid.toString() === key.substr(4)
          })[0].node
          apps.push(
            <li key={key}>
              <Link to={appEditLink}>{app.name}</Link>
            </li>
          )
        }
      })
    } else {
      apps.push(
      <Link to='/app/profile'>Add apps in your profile</Link>
      )
    }
    return apps
  }
  render() {
    const { message, encryptedMessage, myApps } = this.state

    return (
      <StaticQuery
        query={graphql`
          query MainAppsQuery {
            allApps(sort: { fields: [name] }) {
              edges {
                node {
                  ...AppInformation
                }
              }
            }
          }
        `}
        render={data => (
          <>
            <h1>Your Apps</h1>
            <ul>{this.renderApps(myApps, data)}</ul>
          </>
        )}
      />
    )
  }
}

export default Main
