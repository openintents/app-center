import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import {getUser} from '../services/auth'

const StyledRoot = styled.div`
  flexgrow: 1;
`
const StyledCell = styled(Grid)`
  text-align: center;
`

const months = ['dec2018', 'jan2019', 'feb2019', 'mar2019', 'apr2019']
const monthsLabels = [
  'Dec 2018',
  'Jan 2019',
  'Feb 2019',
  'Mar 2019',
  'Apr 2019',
]
const AppEditor = ({ data }) => {
  if (getUser)
  const updates = months.map(months => {
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
        <Grid container spacing={3}>
          <StyledCell item xs={4}>
            <b>Month</b>
          </StyledCell>
          <StyledCell item xs={8}>
            <b>Updates</b>
          </StyledCell>
          {updates}
        </Grid>
      </StyledRoot>
      <hr />
    </Layout>
  )
}

export const query = graphql`
  query($appcoid: Int) {
    apps(id__normalized: { eq: $appcoid }) {
      ...AppInformation
    }
  }
`

export default AppEditor
