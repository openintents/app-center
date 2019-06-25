import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import { loadAppData, isSignedIn } from '../app/services/blockstack'
import Editor from '../lib/editor'

const StyledRoot = styled.div`
  flexgrow: 1;
`
const StyledCell = styled(Grid)`
  text-align: center;
`

const months = [
  'dec2018',
  'jan2019',
  'feb2019',
  'mar2019',
  'apr2019',
  'may2019',
]
const monthsLabels = [
  'Dec 2018',
  'Jan 2019',
  'Feb 2019',
  'Mar 2019',
  'Apr 2019',
  'May 2019',
]
class AppEditor extends Component {
  state = { appEdits: {} }

  componentDidMount() {
    loadAppData(`app-${this.props.data.apps.appcoid}`).then(appEdits => {
      this.setState({ appEdits })
    })
  }

  render() {
    const { data } = this.props
    const userContent = { updates: {} }
    const updates = months.map(month => {
      if (userContent.updates[month]) {
        return (
          <>
            <StyledCell item xs={4}>
              {monthsLabels}
            </StyledCell>
            <StyledCell item xs={8}>
              {userContent.updates[months]}
            </StyledCell>
          </>
        )
      } else {
        return null
      }
    })
    return (
      <Layout>
        <h1>{data.apps.name}</h1>
        <StyledRoot>
          <Editor app={data.apps} edits={this.state.appEdits} />
        </StyledRoot>
        <hr />
      </Layout>
    )
  }
}

export const query = graphql`
  query($appcoid: Int) {
    apps(id__normalized: { eq: $appcoid }) {
      ...AppInformation
    }
  }
`

export default AppEditor
