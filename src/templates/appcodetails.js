import React, { Component } from 'react'
import { graphql, navigate } from 'gatsby'
import Layout from '../components/layout'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import {
  loadMyData,
  saveMyData,
  getUser,
  checkIsSignedIn,
} from '../app/services/blockstack'
import {
  Button,
  Snackbar,
  IconButton,
  Card,
  CardContent,
  AppBar,
  Tabs,
  Tab,
  Container,
  Typography,
  Box,
  Divider,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import LaunchIcon from '@material-ui/icons/Launch'
import NoteIcon from '@material-ui/icons/Note'

import {
  UserComment,
  OwnerComment,
  PrivateUserComment,
  DraftOwnerComment,
} from '../components/model'
import { monthStrings, months, monthsLabels } from '../components/constants'
import Img from 'gatsby-image'
import UserCommentDialog from '../components/userCommentDialog'
import OwnerCommentDialog from '../components/ownerCommentDialog'
import SEO from '../components/seo'
import { SmallAppDetails } from '../components/app'
import { styles } from '../components/layout'

const StyledRoot = styled.div`
  flexgrow: 1;
`
const StyledCell = styled(Grid)`
  text-align: center;
`

const renderTheta = theta => {
  const thetaString = theta ? Number.parseFloat(theta).toFixed(2) : 'X'
  return <small>{thetaString}</small>
}
const Rank = (data, key) => {
  const monthData = data[key].edges.sort((e1, e2) => {
    return parseFloat(e2.node.Final_Score) - parseFloat(e1.node.Final_Score)
  })
  const index = monthData.findIndex(e => {
    if (e.node.hasOwnProperty('App_Name')) {
      return e.node.App_Name === data.apps.name
    } else {
      return e.node.App_ID === data.apps.appcoid.toString()
    }
  })
  if (index >= 0) {
    const node = monthData[index].node
    return (
      <>
        <StyledCell item md={4} xs={4}>
          {monthsLabels[key]}
        </StyledCell>
        <StyledCell item md={2} xs={4}>
          <b>{index + 1}</b>/{data[key].totalCount}
        </StyledCell>
        <StyledCell item md={1} xs={4}>
          <b>{Number.parseFloat(node.Final_Score).toFixed(2)}</b>
        </StyledCell>
        <StyledCell item md={1} xs={2}>
          {renderTheta(node.DE_Theta)}
        </StyledCell>
        <StyledCell item md={1} xs={2}>
          {renderTheta(node.PH_Theta)}
        </StyledCell>
        <StyledCell item md={1} xs={2}>
          {renderTheta(node.NIL_Theta)}
        </StyledCell>
        <StyledCell item md={1} xs={2}>
          {renderTheta(node.TMUI_Theta)}
        </StyledCell>
        <StyledCell item md={1} xs={2}>
          {renderTheta(node.Awario_Theta)}
        </StyledCell>
      </>
    )
  }
  return (
    <>
      <StyledCell item xs={4}>
        {monthsLabels[key]}
      </StyledCell>
      <StyledCell item xs={8} />
    </>
  )
}

const Comments = (data, comments, isSignedIn) => {
  if (!isSignedIn) {
    return (
      <Container>
        <Button variant="outlined" onClick={() => navigate('/data/login')}>
          Sign In to view comments
        </Button>
      </Container>
    )
  }
  if (comments.length === 0) {
    return <Typography>No comments yet</Typography>
  } else {
    return comments.map((c, key) => {
      return (
        <Card key={c._id}>
          <CardContent>
            <Typography>
              {c.attrs.comment}
              <br />
              <small>
                {c.attrs.createdBy || 'A user'}
                {' - '}
                {new Date(c.attrs.createdAt).toLocaleDateString()}
              </small>
            </Typography>
          </CardContent>
        </Card>
      )
    })
  }
}

const MonthlyUpdates = (data, comments, isSignedIn) => {
  if (!isSignedIn) {
    return (
      <Container>
        <Button variant="outlined" onClick={() => navigate('/data/login')}>
          Sign In to view updates
        </Button>
      </Container>
    )
  }
  if (Object.keys(comments).length === 0) {
    return <Typography>No updates yet.</Typography>
  } else {
    const allMonths = []
    const renderComment = month => (c, key) => {
      return (
        <React.Fragment key={c._id}>
          <Typography component="div">
            <Box>{c.attrs.comment}</Box>
            <Box fontSize="small">{c.attrs.createdBy || 'A user'}</Box>
          </Typography>
          {key < comments[month].length - 1 && <Divider light />}
        </React.Fragment>
      )
    }
    for (var month in comments) {
      allMonths.push(
        <Typography key={`title-${month}`}>{monthsLabels[month]}</Typography>
      )
      allMonths.push(
        <Container key={`list-${month}`}>
          {comments[month].map(renderComment(month))}
        </Container>
      )
    }
    return allMonths
  }
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

class AppDetails extends Component {
  state = {
    isClaimedApp: false,
    visibility: 'private',
    rating: 0,
    userUpdate: '',
    showUndoAction: false,
    showUpdateDialog: false,
    comments: [],
    monthlyUpdates: {},
    tabIndex: 0,
    userData: null,
    loadingData: true,
  }

  componentDidMount() {
    checkIsSignedIn().then(isSignedIn => {
      if (isSignedIn) {
        const { data } = this.props
        loadMyData().then(content => {
          const isClaimedApp =
            content.myApps &&
            content.myApps.hasOwnProperty(`app-${data.apps.appcoid}`) &&
            content.myApps[`app-${data.apps.appcoid}`]

          this.setState({
            isClaimedApp,
            isSignedIn: true,
            userData: getUser(),
          })
        })
        this.loadComments()
      } else {
        this.setState({ isSignedIn: false })
      }
    })
  }

  loadComments() {
    const { data } = this.props
    this.setState({
      loadingComments: true,
      loadingUpdates: true,
    })
    OwnerComment.fetchList({
      object: data.apps.website,
      sort: '-createdAt',
    }).then(comments => {
      const monthlyUpdates = {}
      let createdAtDate, dateKey
      comments.forEach(comment => {
        const { createdAt } = comment.attrs
        createdAtDate = new Date(createdAt)
        dateKey =
          monthStrings[createdAtDate.getUTCMonth()] +
          createdAtDate.getUTCFullYear().toString()
        if (!monthlyUpdates.hasOwnProperty(dateKey)) {
          monthlyUpdates[dateKey] = []
        }
        monthlyUpdates[dateKey].push(comment)
      })
      this.setState({
        monthlyUpdates,
        loadingUpdates: false,
        loadingData: this.state.loadingComments,
      })
    })

    UserComment.fetchList({
      object: data.apps.website,
      sort: '-createdAt',
    }).then(comments => {
      this.setState({
        comments,
        loadingComments: false,
        loadingData: this.state.loadingUpdates,
      })
    })
  }

  launchApp() {
    window.location = this.props.data.apps.website
  }

  claimApp() {
    if (this.state.isSignedIn) {
      this.setState({ isClaimingApp: true })
      loadMyData().then(content => {
        if (!content.myApps) {
          content.myApps = {}
        }
        content.myApps[`app-${this.props.data.apps.appcoid}`] = true
        saveMyData(content).then(() => {
          this.setState({
            isClaimedApp: true,
            isClaimingApp: false,
            showUndoAction: true,
            undoFunction: () => {
              this.removeApp()
              this.handleCloseUndo()
            },
            actionMessage: 'App has been added.',
            userUpdate: '',
            visibility: 'private',
            rating: 0,
          })
        })
      })
    } else {
      navigate('/data/login')
    }
  }

  removeApp() {
    if (this.state.isSignedIn) {
      this.setState({ isClaimingApp: true })
      loadMyData().then(content => {
        content.myApps[`app-${this.props.data.apps.appcoid}`] = false
        saveMyData(content).then(() => {
          this.setState({
            isClaimedApp: false,
            isClaimingApp: false,
            showUndoAction: true,
            undoFunction: () => {
              this.claimApp()
              this.handleCloseUndo()
            },
            actionMessage: 'App has been removed.',
            userUpdate: '',
            visibility: 'private',
            rating: 0,
          })
        })
      })
    } else {
      navigate('/data/login')
    }
  }

  handleChangeTabIndex = (e, tabIndex) => {
    e.preventDefault()
    this.setState({ tabIndex })
  }

  handleCloseUndo() {
    this.setState({ showUndoAction: false })
  }

  handleChangeVisibility = event => {
    this.setState({ visibility: event.target.value })
  }

  handleCloseUpdate = () => {
    this.setState({ showUpdateDialog: false })
  }

  handleChangeText = e => {
    this.setState({ userUpdate: e.target.value })
  }

  handleChangeRating = value => {
    this.setState({ rating: value })
  }

  postComment = async () => {
    this.setState({ updating: true })
    const { userUpdate, visibility, userData, rating } = this.state
    const comment =
      visibility === 'public'
        ? new UserComment({
            comment: userUpdate,
            rating,
            object: this.props.data.apps.website,
            createdBy: userData.name,
          })
        : new PrivateUserComment({
            comment: userUpdate,
            rating,
            object: this.props.data.apps.website,
          })
    await comment.save()
    await this.loadComments()
    this.setState({ showUpdateDialog: false, updating: false })
  }

  postUpdate = async () => {
    this.setState({ updating: true })
    const { userUpdate, userData } = this.state
    await new OwnerComment({
      comment: userUpdate,
      object: this.props.data.apps.website,
      createdBy: userData.name,
    }).save()

    await this.loadComments()
    this.setState({ showUpdateDialog: false, updating: false })
  }

  saveDraftUpdate = async () => {
    this.setState({ updating: true })
    const { userUpdate } = this.state
    await new DraftOwnerComment({
      comment: userUpdate,
      object: this.props.data.apps.website,
    }).save()
    this.setState({ updating: false })
  }

  render() {
    const { data } = this.props
    const {
      isClaimedApp,
      isClaimingApp,
      showUndoAction,
      showUpdateDialog,
      actionMessage,
      undoFunction,
      visibility,
      rating,
      userUpdate,
      monthlyUpdates,
      comments,
      tabIndex,
      isSignedIn,
      updating,
    } = this.state
    const appActions = isClaimedApp ? (
      <>
        <Button
          variant="outlined"
          onClick={() => this.setState({ showUpdateDialog: true })}
        >
          <NoteIcon style={styles.smallIcon} />
          Post progress update
        </Button>{' '}
        <Button
          variant="outlined"
          disabled={isClaimingApp}
          onClick={() => this.removeApp()}
        >
          Remove from my apps
        </Button>
        <Button disabled={!data.apps.website} onClick={() => this.launchApp()}>
          <LaunchIcon style={styles.smallIcon} />
        </Button>
      </>
    ) : (
      <>
        <Button
          variant="outlined"
          onClick={() => {
            if (this.state.isSignedIn) {
              this.setState({ showUpdateDialog: true })
            } else {
              navigate('/data/login')
            }
          }}
        >
          <NoteIcon style={styles.smallIcon} />
          Post comment
        </Button>{' '}
        <Button
          disabled={isClaimingApp}
          onClick={() => {
            this.claimApp()
          }}
          variant="outlined"
        >
          Claim this app
        </Button>
        <Button disabled={!data.apps.website} onClick={() => this.launchApp()}>
          <LaunchIcon style={styles.smallIcon} />
        </Button>
      </>
    )

    const monthlyScoresInGrid = []
    for (var key = 0; key < months.length; key++) {
      if (key < months.length - 1) {
        monthlyScoresInGrid.push(
          <React.Fragment key={key}>
            {Rank(data, months[months.length - key - 1])}
            <StyledCell key={`hr-${key}`} item xs={12}>
              <hr />
            </StyledCell>
          </React.Fragment>
        )
      } else {
        monthlyScoresInGrid.push(
          <React.Fragment key={key}>
            {Rank(data, months[months.length - key - 1])}
          </React.Fragment>
        )
      }
    }
    const icon =
      data.apps.localFile && data.apps.localFile.childImageSharp ? (
        <Img fixed={data.apps.localFile.childImageSharp.fixed} />
      ) : null
    return (
      <Layout>
        <SEO
          title={data.apps.name}
          description={data.apps.description}
          keywords={[data.apps.name, `application`, `blockstack`]}
        />
        <Grid container alignItems="center" spacing={2}>
          <Grid item>{icon}</Grid>
          <Grid item>
            <Typography variant="h3" align="center">
              {data.apps.name}
            </Typography>
          </Grid>
          <Grid item>{appActions}</Grid>
        </Grid>

        <Container>
          {SmallAppDetails({
            description: data.apps.description,
            lifetimeEarnings: data.apps.lifetimeEarnings,
            lastCommit: data.apps.fields && data.apps.fields.lastCommit,
            openSourceUrl: data.apps.openSourceUrl,
            hideRewards: false,
            showSourceLink: true,
          })}
        </Container>
        <StyledRoot>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={tabIndex}
              onChange={this.handleChangeTabIndex}
            >
              <LinkTab label="Scores" />
              <LinkTab label="Updates" />
              <LinkTab label="Comments" />
            </Tabs>
          </AppBar>
          <br />
          {tabIndex === 0 && (
            <Typography component="div">
              <Grid container spacing={0}>
                <StyledCell item md={4} xs={4}>
                  <b>Month</b>
                </StyledCell>
                <StyledCell item md={2} xs={4}>
                  <b>Rank</b>
                </StyledCell>
                <StyledCell item md={1} xs={4}>
                  <b>Final Score</b>
                </StyledCell>
                <StyledCell item md={1} xs={2}>
                  <small>DE</small>
                </StyledCell>
                <StyledCell item md={1} xs={2}>
                  <small>PH</small>
                </StyledCell>
                <StyledCell item md={1} xs={2}>
                  <small>NIL</small>
                </StyledCell>
                <StyledCell item md={1} xs={2}>
                  <small>TMUI</small>
                </StyledCell>
                <StyledCell item md={1} xs={2}>
                  <small>AW</small>
                </StyledCell>
                <StyledCell item xs={12}>
                  <hr />
                </StyledCell>
                {monthlyScoresInGrid}
              </Grid>
            </Typography>
          )}

          {tabIndex === 1 && (
            <>{MonthlyUpdates(data, monthlyUpdates, isSignedIn)}</>
          )}
          {tabIndex === 2 && <>{Comments(data, comments, isSignedIn)}</>}
        </StyledRoot>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showUndoAction}
          autoHideDuration={1000}
          onClose={() => this.handleCloseUndo()}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{actionMessage}</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={undoFunction}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.handleCloseUndo()}
            >
              <CloseIcon style={styles.smallIcon} />
            </IconButton>,
          ]}
        />

        {!isClaimedApp &&
          UserCommentDialog({
            userUpdate,
            showUpdateDialog,
            updating,
            visibility,
            rating,
            handleCloseUpdate: this.handleCloseUpdate,
            handleChangeVisibility: this.handleChangeVisibility,
            handleChangeText: this.handleChangeText,
            handleChangeRating: this.handleChangeRating,
            postComment: this.postComment,
          })}

        {isClaimedApp &&
          OwnerCommentDialog({
            userUpdate,
            showUpdateDialog,
            updating,
            visibility,
            handleCloseUpdate: this.handleCloseUpdate,
            handleChangeVisibility: this.handleChangeVisibility,
            handleChangeText: this.handleChangeText,
            saveDraftUpdate: this.saveDraftUpdate,
            postComment: this.postComment,
          })}

        <hr />
      </Layout>
    )
  }
}

export const query = graphql`
  query($appcoid: Int) {
    apps(id__normalized: { eq: $appcoid }) {
      ...AppInformation
      localFile {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
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

    jun2019: allAppminingresultsXlsxJune2019(
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
