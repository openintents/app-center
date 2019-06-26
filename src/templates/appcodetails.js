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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { UserComment } from '../components/model'

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
const Rank = (data, key, label) => {
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
          {label}
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
        {label}
      </StyledCell>
      <StyledCell item xs={8} />
    </>
  )
}

class AppDetails extends Component {
  state = {
    isClaimedApp: false,
    visibility: 'private',
    userUpdate: '',
    showUndoAction: false,
    showUpdateDialog: false,
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
    } else {
      this.setState({ isSignedIn: false })
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

  postComment() {
    const { userUpdate, visibility } = this.state
    postUserUpdate(
      visibility,
      new UserComment({
        comment: userUpdate,
        object: this.props.data.apps.website,
      })
    )
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

    const updateLabel = isClaimedApp ? 'Updates for this month' : 'My feedback'
    const updateHelperText = isClaimedApp
      ? 'What is new? (~200 characters)'
      : 'What did you like or dislike?'
    return (
      <Layout>
        <h1>{data.apps.name}</h1>
        <StyledRoot>
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
            {Rank(data, 'june2019', 'June 2019')}
            <StyledCell item xs={12}>
              <hr />
            </StyledCell>
            {Rank(data, 'may2019', 'May 2019')}
            <StyledCell item xs={12}>
              <hr />
            </StyledCell>
            {Rank(data, 'apr2019', 'Apr 2019')}
            <StyledCell item xs={12}>
              <hr />
            </StyledCell>
            {Rank(data, 'mar2019', 'Mar 2019')}
            <StyledCell item xs={12}>
              <hr />
            </StyledCell>
            {Rank(data, 'feb2019', 'Feb 2019')}
            <StyledCell item xs={12}>
              <hr />
            </StyledCell>
            {Rank(data, 'jan2019', 'Jan 2019')}
            <StyledCell item xs={12}>
              <hr />
            </StyledCell>
            {Rank(data, 'dec2018', 'Dec 2018')}
          </Grid>
        </StyledRoot>
        <hr />
        {appActions}
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
              helperText={updateHelperText}
              variant="outlined"
              value={userUpdate}
              onChange={e => {
                console.log({ value: e.target.value })
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
