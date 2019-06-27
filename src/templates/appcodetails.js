import React, { Component } from 'react'
import { graphql, navigate } from 'gatsby'
import Layout from '../components/layout'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import {
  isSignedIn,
  loadMyData,
  saveMyData,
  postUserUpdate,
} from '../app/services/blockstack'
import {
  Button,
  Snackbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { UserComment, OwnerComment } from '../components/model'
import { User } from 'radiks'
import { monthStrings, months, monthsLabels } from '../components/constants'
import { loadUserData } from 'blockstack'

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

const Comments = (data, comments) => {
  if (comments.length === 0) {
    return <>No comments yet</>
  } else {
    return comments.map((c, key) => {
      return (
        <Card key={key}>
          <CardContent>
            {c.attrs.comment}
            <br />
            <small>
              {c.attrs.createdBy || 'A user'}
              {' - '}
              {new Date(c.attrs.createdAt).toLocaleDateString()}
            </small>
          </CardContent>
        </Card>
      )
    })
  }
}

const MonthlyUpdates = (data, comments, month) => {
  console.log(comments, month)
  if (comments.length === 0 || !comments.hasOwnProperty(month)) {
    return <>No Updates for {monthStrings[month]}</>
  } else {
    return comments[month].map((c, key) => {
      return (
        <Card key={key}>
          <CardContent>
            {c.attrs.comment}
            <br />
            <small>
              {c.attrs.createdBy || 'A user'}
              {' - '}
              {new Date(c.attrs.createdAt).toLocaleDateString()}
            </small>
          </CardContent>
        </Card>
      )
    })
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
    if (isSignedIn()) {
      const { data } = this.props
      loadMyData().then(content => {
        const isClaimedApp =
          content.myApps.hasOwnProperty(`app-${data.apps.appcoid}`) &&
          content.myApps[`app-${data.apps.appcoid}`]

        this.setState({ isClaimedApp, isSignedIn: true })
      })

      this.setState({
        loadingComments: true,
        loadingUpdates: true,
        userData: loadUserData(),
      })
      User.createWithCurrentUser().then(() => {
        OwnerComment.fetchList({ object: data.apps.website }).then(comments => {
          console.log('owner comments', comments)
          const monthlyUpdates = {}
          let createdAtDate, dateKey
          comments.forEach(comment => {
            const { createdAt } = comment.attrs
            createdAtDate = new Date(createdAt)
            console.log(
              createdAtDate,
              createdAtDate.getUTCMonth(),
              monthStrings[createdAtDate.getUTCMonth()]
            )
            dateKey =
              monthStrings[createdAtDate.getUTCMonth()] +
              createdAtDate.getUTCFullYear().toString()
            console.log(dateKey)
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

        UserComment.fetchList({ object: data.apps.website }).then(comments => {
          this.setState({
            comments,
            loadingComments: false,
            loadingData: this.state.loadingUpdates,
          })
        })
      })
    } else {
      this.setState({ isSignedIn: false, loadingData: false })
    }
  }

  claimApp() {
    if (this.state.isSignedIn) {
      this.setState({ isClaimingApp: true })
      loadMyData().then(content => {
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
          })
        })
      })
    } else {
      navigate('/app/login')
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
          })
        })
      })
    } else {
      navigate('/app/login')
    }
  }

  handleChangeVisibility(event) {
    this.setState({ visibility: event.target.value })
  }

  handleCloseUndo() {
    this.setState({ showUndoAction: false })
  }

  handleCloseUpdate() {
    this.setState({ showUpdateDialog: false })
  }

  async postComment() {
    const { userUpdate, visibility, userData } = this.state
    await postUserUpdate(
      visibility,
      new UserComment({
        comment: userUpdate,
        object: this.props.data.apps.website,
        createdBy: userData.name,
      })
    )
    this.setState({ showUpdateDialog: false })
  }

  async postUpdate() {
    const { userUpdate, visibility, userData } = this.state
    await postUserUpdate(
      visibility,
      new OwnerComment({
        comment: userUpdate,
        object: this.props.data.apps.website,
        createdBy: userData.name,
      })
    )
    this.setState({ showUpdateDialog: false })
  }

  handleChangeTabIndex(e, tabIndex) {
    this.setState({ tabIndex })
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
      userUpdate,
      monthlyUpdates,
      comments,
      tabIndex,
    } = this.state
    const appActions = isClaimedApp ? (
      <>
        <Button
          variant="outlined"
          onClick={() => navigate(`/appco-edit/${data.apps.appcoid}`)}
        >
          Edit details
        </Button>{' '}
        <Button
          variant="outlined"
          onClick={() => this.setState({ showUpdateDialog: true })}
        >
          Post progress update
        </Button>{' '}
        <Button
          variant="outlined"
          disabled={isClaimingApp}
          onClick={() => this.removeApp()}
        >
          Remove from my apps
        </Button>
      </>
    ) : (
      <>
        <Button
          disabled={isClaimingApp}
          onClick={() => {
            this.claimApp()
          }}
          variant="outlined"
        >
          This is my app
        </Button>{' '}
        <Button
          variant="outlined"
          onClick={() => this.setState({ showUpdateDialog: true })}
        >
          Post comment
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
    return (
      <Layout>
        <h1>
          {data.apps.name} {appActions}
        </h1>

        <StyledRoot>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={tabIndex}
              onChange={(e, tabIndex) => this.handleChangeTabIndex(e, tabIndex)}
            >
              <LinkTab label="Scores" href="/scores" />
              <LinkTab label="Updates" href="/updates" />
              <LinkTab label="Comments" href="/comments" />
            </Tabs>
          </AppBar>
          {tabIndex === 0 && (
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
          )}

          {tabIndex === 1 && (
            <>{MonthlyUpdates(data, monthlyUpdates, 'jun2019')}</>
          )}
          {tabIndex === 2 && <>{Comments(data, comments)}</>}
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
              <CloseIcon />
            </IconButton>,
          ]}
        />

        {!isClaimedApp && (
          <Dialog
            open={showUpdateDialog}
            onClose={this.handleCloseUpdate}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {isClaimedApp && <>Publish Updates</>}
              {!isClaimedApp && <>Add Comment</>}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Updates and comments are shown to either all users publicly or
                only to the app developers
              </DialogContentText>

              <RadioGroup
                aria-label="Visibility"
                name="visibility"
                value={visibility}
                onChange={e => this.handleChangeVisibility(e)}
              >
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Visible for all"
                />
                <FormControlLabel
                  value="devs"
                  control={<Radio />}
                  label="Visible for app owner only"
                />
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Visible only for me"
                />
              </RadioGroup>
              <TextField
                margin="normal"
                id="userUpdate"
                type="text"
                fullWidth
                multiline
                rows="3"
                helperText="What did you like or dislike?"
                variant="outlined"
                value={userUpdate}
                onChange={e => {
                  this.setState({ userUpdate: e.target.value })
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleCloseUpdate()} color="primary">
                Cancel
              </Button>
              <Button onClick={() => this.postComment()} color="primary">
                Post
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {isClaimedApp && (
          <Dialog
            open={showUpdateDialog}
            onClose={this.handleCloseUpdate}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Publish Updates</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Updates are shown to all users onced published
              </DialogContentText>
              <TextField
                margin="normal"
                id="userUpdate"
                type="text"
                fullWidth
                multiline
                rows="3"
                helperText="What is new? (~200 characters)"
                variant="standard"
                value={userUpdate}
                onChange={e => {
                  this.setState({ userUpdate: e.target.value })
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.handleCloseUpdate()}
                color="secondary"
              >
                Cancel
              </Button>
              <Button onClick={() => this.postUpdate()} color="secondary">
                Save Draft
              </Button>
              <Button onClick={() => this.postUpdate()} color="primary">
                Publish
              </Button>
            </DialogActions>
          </Dialog>
        )}

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
