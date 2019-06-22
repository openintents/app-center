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

const renderTheta = theta => {
  if (theta) {
    return Number.parseFloat(theta).toFixed(2)
  }
  return 'X'
}
const Rank = (data, key, label) => {
  const index = data[key].edges.findIndex(e => {
    if (e.node.hasOwnProperty('App_Name')) {
      return e.node.App_Name === data.apps.name
    } else {
      return e.node.App_ID === data.apps.appcoid.toString()
    }
  })
  if (index >= 0) {
    const node = data[key].edges[index].node
    return (
      <>
        <StyledCell item xs={4}>
          {label}
        </StyledCell>
        <StyledCell item xs={2}>
          <b>{index + 1}</b>/{data[key].totalCount}
        </StyledCell>
        <StyledCell item xs={1}>
          <b>{Number.parseFloat(node.Final_Score).toFixed(2)}</b>
        </StyledCell>
        <StyledCell item xs={1}>
          {renderTheta(node.DE_Theta)}
        </StyledCell>
        <StyledCell item xs={1}>
          {renderTheta(node.PH_Theta)}
        </StyledCell>
        <StyledCell item xs={1}>
          {renderTheta(node.NIL_Theta)}
        </StyledCell>
        <StyledCell item xs={1}>
          {renderTheta(node.TMUI_Theta)}
        </StyledCell>
        <StyledCell item xs={1}>
          {renderTheta(node.Awario_Theta)}
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
          <StyledCell item xs={2}>
            <b>Rank</b>
          </StyledCell>
          <StyledCell item xs={1}>
            <b>Final Score</b>
          </StyledCell>
          <StyledCell item xs={1}>
            DE
          </StyledCell>
          <StyledCell item xs={1}>
            PH{' '}
          </StyledCell>
          <StyledCell item xs={1}>
            NIL
          </StyledCell>
          <StyledCell item xs={1}>
            TMUI{' '}
          </StyledCell>
          <StyledCell item xs={1}>
            Awario
          </StyledCell>
          {Rank(data, 'june2019', 'June 2019')}
          <br />
          {Rank(data, 'may2019', 'May 2019')}
          <br />
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
          PH_Theta: Theta_PH_
          DE_Theta: Theta_DE_
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
          PH_Theta: Theta_PH_
          TMUI_Theta: Theta_TMUI_
          DE_Theta: Theta_DE_
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
          PH_Theta: Theta_PH_
          TMUI_Theta: Theta_TMUI_
          DE_Theta: Theta_DE_
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
          PH_Theta
          DE_Theta    
          TMUI_Theta      
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
          PH_Theta
          TMUI_Theta
          DE_Theta
          NIL_Theta: Digital_Rights_Theta
        }
      }
    }

    may2019: allAppminingresultsXlsxMay2019(
      filter: { Final_Score: { ne: null } }
      sort: { fields: [Final_Score], order: [DESC] }
    ) {
      totalCount
      edges {
        node {
          App_ID: App_Id
          Final_Score
          PH_Theta
          TMUI_Theta
          NIL_Theta
          Awario_Theta
        }
      }
    }

    june2019: allAppminingresultsXlsxJune2019(
      filter: { Final_Score: { ne: null } }
      sort: { fields: [Final_Score], order: [DESC] }
    ) {
      totalCount
      edges {
        node {
          App_ID: App_Id
          Final_Score
          PH_Theta
          TMUI_Theta
          NIL_Theta
          Awario_Theta
        }
      }
    }
  }
`

export default AppDetails
