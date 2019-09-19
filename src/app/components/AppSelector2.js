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

const AddDialog = ({ show, searchIndex, claimApp, working }) => {
  return (
    <Dialog open={show} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Claim App</DialogTitle>
      <DialogContent>
        <DialogContentText>Select app to add to your list.</DialogContentText>
        <Container>
          {!working && (
            <Search
              searchIndex={searchIndex}
              suggestionSelectedCallback={claimApp}
            />
          )}
          <Box height={200} align="center">
            {working && (
              <CircularProgress style={{ marginTop: 88 }} size={36} />
            )}
          </Box>
        </Container>
        <DialogActions>
          <Button color="primary">Cancel</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

const AppSelector2 = ({ myApps }) => {
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
            disable={dialogState.working}
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
        searchIndex={data.siteSearchIndex.index}
        claimApp={claimApp}
        working={dialogState.working}
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
