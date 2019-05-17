import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

const StyledRoot = styled.div`
  flexgrow: 1;
`
const StyledCell = styled(Grid)`
  text-align: center;
`

const Rank = (data, key, label) => {
  const index = data[key].edges.findIndex(e => {
    if (e.node.hasOwnProperty('App_Name')) {
      return e.node.App_Name === data.apps.name
    } else {
      return e.node.App_ID === data.apps.appcoid
    }
  })
  if (index >= 0) {
    return (
      <>
        <StyledCell item xs={4}>
          {label}
        </StyledCell>
        <StyledCell item xs={4}>
          {' '}
          <b>{index + 1}</b>/{data[key].totalCount}
        </StyledCell>
        <StyledCell item xs={4}>
          <small>{data[key].edges[index].node.Final_Score}</small>
        </StyledCell>
      </>
    )
  }
  return (
    <>
      <StyledCell item xs={4}>
        {label}
      </StyledCell>
      <StyledCell item xs={8} />
    </>
  )
}
const AppDetails = ({ data }) => {
  return (
    <Layout>
      <h1>{data.apps.name}</h1>
      <StyledRoot>
        <Grid container spacing={3}>
          <StyledCell item xs={4}>
            <b>Month</b>
          </StyledCell>
          <StyledCell item xs={4}>
            <b>Rank</b>
          </StyledCell>
          <StyledCell item xs={4}>
            <b>Final Score</b>
          </StyledCell>
          {Rank(data, 'apr2019', 'Apr 2019')}
          <br />
          {Rank(data, 'mar2019', 'Mar 2019')}
          <br />
          {Rank(data, 'feb2019', 'Feb 2019')}
          <br />
          {Rank(data, 'jan2019', 'Jan 2019')}
          <br />
          {Rank(data, 'dec2018', 'Dec 2018')}
          <br />
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
    dec2018: allAppminingresultsXlsxDecember2018(
      filter: { Final_Score: { ne: null } }
      sort: { fields: [Final_Score], order: [DESC] }
    ) {
      totalCount
      edges {
        node {
          App_Name
          Final_Score
        }
      }
    }
    jan2019: allAppminingresultsXlsxJanuary2019(
      filter: { Final_Score: { ne: null } }
      sort: { fields: [Final_Score], order: [DESC] }
    ) {
      totalCount
      edges {
        node {
          App_Name
          Final_Score
        }
      }
    }

    feb2019: allAppminingresultsXlsxFebruary2019(
      filter: { Final_Score: { ne: null } }
      sort: { fields: [Final_Score], order: [DESC] }
    ) {
      totalCount
      edges {
        node {
          App_ID: App_Id
          Final_Score
        }
      }
    }

    mar2019: allAppminingresultsXlsxMarch2019(
      filter: { Final_Score: { ne: null } }
      sort: { fields: [Final_Score], order: [DESC] }
    ) {
      totalCount
      edges {
        node {
          App_ID
          Final_Score
        }
      }
    }

    apr2019: allAppminingresultsXlsxApril2019(
      filter: { Final_Score: { ne: null } }
      sort: { fields: [Final_Score], order: [DESC] }
    ) {
      totalCount
      edges {
        node {
          App_ID
          Final_Score
        }
      }
    }
  }
`

export default AppDetails
