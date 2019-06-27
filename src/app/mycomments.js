import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { getUser, loadMyData } from './services/blockstack'
import {
  Typography,
  ListItem,
  ListItemText,
  List,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
} from '@material-ui/core'
import { UserComment, OwnerComment } from '../components/model'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIdcon from '@material-ui/icons/Edit'

class MyComments extends React.Component {
  state = {
    myApps: {},
    myComments: [],
    myUpdates: [],
    loading: true,
    loadingApps: true,
    loadingComments: true,
    loadingUpdates: true,
  }

  componentDidMount() {
    loadMyData().then(content => {
      this.setState({
        myApps: content.myApps,
        loadingApps: false,
        loading: this.state.loadingComments && this.state.loadingUpdates,
      })
    })

    UserComment.fetchOwnList().then(myComments => {
      this.setState({
        myComments,
        loadingComments: false,
        loading: this.state.loadingApps && this.state.loadingUpdates,
      })
    })
    OwnerComment.fetchOwnList().then(myUpdates => {
      this.setState({
        myUpdates,
        loadingUpdates: false,
        loading: this.state.loadingApps && this.state.loadingComments,
      })
    })
  }

  handleClick(comment) {
    this.setState({ currentComment: comment, showUpdateDialog: true })
  }

  handleDeleteClick(comment) {
    const myComments = this.state.myComments.filter(item => item !== comment)
    comment.destroy()
    this.setState({ myComments })
  }

  renderComments(myComments, data) {
    const comments = []
    if (myComments) {
      myComments.forEach(c => {
        const apps = data.allApps.edges.filter(
          e => e.node.website === c.attrs.object
        )
        const secondaryText =
          apps.length === 1 ? <>For {apps[0].node.name}</> : null
        comments.push(
          <ListItem button key={c._id} onClick={() => this.handleClick(c)}>
            <ListItemText
              primary={<>{c.attrs.comment}</>}
              secondary={secondaryText}
            />
            <ListItemSecondaryAction onClick={() => this.handleDeleteClick(c)}>
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })
    } else {
      comments.push(
        <ListItem>
          <ListItemText
            primary={
              <>
                <Link to="/appco-foss">Add comments to a few apps</Link>
              </>
            }
          />
        </ListItem>
      )
    }
    return <List>{comments}</List>
  }

  render() {
    const user = getUser()
    const { myComments, myUpdates, loading } = this.state

    return (
      <StaticQuery
        query={graphql`
          query MyCommentsQuery {
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
            {loading && <>Loading...</>}
            {!loading && (
              <>
              <Typography variant="h3">Comments</Typography>
                {this.renderComments(myComments, data)}
                <Divider light />
                {this.renderComments(myUpdates, data)}
              </>
            )}
            <Dialog></Dialog>
          </>
        )}
      />
    )
  }
}

export default MyComments
