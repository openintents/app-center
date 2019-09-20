import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  List,
  Typography,
  CardHeader,
  CardContent,
  Card,
  CardActions,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Container,
  DialogContentText,
  Box,
  CircularProgress,
  DialogActions,
} from '@material-ui/core'
import AppsIcon from '@material-ui/icons/Apps'
import AddIcon from '@material-ui/icons/AddCircle'
import MyApp from '../../components/myApp'
import { styles } from '../../components/layout'
import Search from '../../components/search'
import { loadMyData, saveMyData } from '../services/blockstack'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const AddDialog = ({
  show,
  onClose,
  searchIndex,
  claimApp,
  working,
  username,
  allApps,
}) => {
  const isClaimableApp = suggestion => {
    const suggestedApps = allApps.edges.filter(
      e => e.node.appcoid === suggestion.appcoid
    )
    if (suggestedApps.length > 0) {
      if (
        suggestedApps[0].node.fields &&
        suggestedApps[0].node.fields.authors
      ) {
        const authors = JSON.parse(suggestedApps[0].node.fields.authors)
        return authors.indexOf(username) >= 0
      }
    }
    return false
  }

  const [claimable, setClaimable] = useState(true)
  const handleClose = () => {
    setClaimable(true)
    onClose()
  }
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Claim App</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select app to add to your list.
          <Typography component="span" hidden={!claimable}>
            <br /> Just start typing!
          </Typography>
          <Typography component="span" color="error" hidden={claimable}>
            <br /> Not your app!{' '}
            <a href="https://forum.blockstack.org/t/app-ownership-on-oi-app-center-and-elsewhere/9049" color="error" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon  icon={faQuestionCircle} /></a>
          </Typography>
        </DialogContentText>

        <Container>
          {!working && (
            <Search
              searchIndex={searchIndex}
              suggestionSelectedCallback={suggestion => {
                if (isClaimableApp(suggestion)) {
                  setClaimable(true)
                  claimApp(suggestion)
                } else {
                  setClaimable(false)
                }
              }}
              suggestionValueChangedCallback={() => setClaimable(true)}
            />
          )}
          <Box height={200} align="center">
            {working && (
              <CircularProgress style={{ marginTop: 88 }} size={36} />
            )}
          </Box>
        </Container>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

const AppSelector2 = ({ myApps, username }) => {
  const [dialogState, setDialogState] = useState({
    showAddDialog: false,
    working: false,
  })
  const [currentAppList, setCurrentAppList] = useState(myApps)

  const data = useStaticQuery(graphql`
    query AppsQuery2 {
      allApps(sort: { fields: [name] }) {
        edges {
          node {
            ...AppInformation
            ...AppIcon
          }
        }
      }
      siteSearchIndex {
        index
      }
    }
  `)

  function claimApp(suggestion) {
    setDialogState({ showAddDialog: true, working: true })
    loadMyData().then(content => {
      if (!content.myApps) {
        content.myApps = {}
      }
      content.myApps[`app-${suggestion.appcoid}`] = true
      saveMyData(content).then(() => {
        setDialogState({ showAddDialog: false, working: false })
        setCurrentAppList(content.myApps)
      })
    })
  }

  function removeApp(app) {
    setDialogState({ showAddDialog: false, working: true })
    loadMyData().then(content => {
      content.myApps[`app-${app.appcoid}`] = false
      saveMyData(content).then(() => {
        setCurrentAppList(content.myApps)
        setDialogState({ showAddDialog: false, working: false })
      })
    })
  }

  const apps = []
  let i, app

  const myAppData = data.allApps.edges.filter(
    e => currentAppList[`app-${e.node.appcoid}`] || false
  )
  for (i in myAppData) {
    app = myAppData[i].node
    apps.push(<MyApp key={app.appcoid} data={app} removeApp={removeApp} />)
  }
  const title =
    currentAppList && currentAppList.size === 1 ? 'Your App' : 'Your Apps'
  return (
    <>
      <Card style={{ margin: 4 }}>
        <CardHeader
          title={<Typography variant="h5">{title}</Typography>}
          avatar={<AppsIcon style={styles.smallIcon} />}
        />
        <CardContent>
          <List>{apps}</List>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            disable={dialogState.working.toString()}
            onClick={() =>
              setDialogState({ showAddDialog: true, working: false })
            }
          >
            <AddIcon style={styles.smallIcon} />
            Add more
          </Button>
        </CardActions>
      </Card>
      <AddDialog
        show={dialogState.showAddDialog}
        onClose={() => setDialogState({ showAddDialog: false, working: false })}
        searchIndex={data.siteSearchIndex.index}
        claimApp={claimApp}
        working={dialogState.working}
        username={username}
        allApps={data.allApps}
      />
      <Dialog open={dialogState.working && !dialogState.showAddDialog}>
        <DialogContent>
          <Container align="center">
            <CircularProgress size={36} />
            <Typography>Removing app</Typography>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AppSelector2
