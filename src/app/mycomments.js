import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { loadMyData, postUserUpdate } from './services/blockstack'
import {
  Typography,
  ListItem,
  ListItemText,
  List,
  Divider,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import {
  UserComment,
  OwnerComment,
  PrivateUserComment,
  DraftOwnerComment,
  saveDraftUserComment,
  saveDraftOwnerComment,
  saveOwnerComment,
  saveUserComment,
  savePrivateUserComment,
} from '../components/model'
import DeleteIcon from '@material-ui/icons/Delete'
import { User } from 'radiks/lib'
import UserCommentDialog from '../components/userCommentDialog'
import OwnerCommentDialog from '../components/ownerCommentDialog'

class MyComments extends React.Component {
  state = {
    myApps: {},
    myComments: [],
    myUpdates: [],
    myPrivateComments: [],
    myDraftUpdates: [],
    loading: true,
    loadingApps: true,
    loadingComments: true,
    loadingUpdates: true,
    showUpdateDialog: false,
    showCommentDialog: false,
    userUpdate: '',
    currentVisibility: 'private',
    updating: false,
  }

  componentDidMount() {
    User.createWithCurrentUser().then(() => {
      loadMyData().then(content => {
        this.setState({
          myApps: content.myApps,
          loadingApps: false,
          loading: this.state.loadingComments && this.state.loadingUpdates,
        })
      })

      this.loadComments()
    })
  }

  loadComments() {
    UserComment.fetchOwnList().then(myComments => {
      this.setState({
        myComments,
        loadingComments: false,
        loading: this.state.loadingApps && this.state.loadingUpdates,
      })
    })
    PrivateUserComment.fetchOwnList().then(myPrivateComments => {
      this.setState({
        myPrivateComments,
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
    DraftOwnerComment.fetchOwnList().then(myDraftUpdates => {
      this.setState({
        myDraftUpdates,
        loadingUpdates: false,
        loading: this.state.loadingApps && this.state.loadingUpdates,
      })
    })
  }

  handleClick(comment) {
    const visibility = [
      UserComment.modelName(),
      OwnerComment.modelName(),
    ].includes(comment.modelName())
      ? 'public'
      : 'private'
    const asComment = [
      UserComment.modelName(),
      PrivateUserComment.modelName(),
    ].includes(comment.modelName())
    this.setState({
      userUpdate: comment.attrs.comment,
      currentComment: comment,
      currentVisibility: visibility,
      showUpdateDialog: !asComment,
      showCommentDialog: asComment,
    })
  }

  handleDeleteClick(comment) {
    const myComments = this.state.myComments.filter(item => item !== comment)
    const myPrivateComments = this.state.myPrivateComments.filter(item => item !== comment)
    const myUpdates = this.state.myUpdates.filter(item => item !== comment)
    const myDraftUpdates = this.state.myDraftUpdates.filter(item => item !== comment)
    comment.destroy()
    this.setState({ myComments, myPrivateComments, myUpdates, myDraftUpdates })
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

  handleChangeVisibility = event => {
    this.setState({ currentVisibility: event.target.value })
  }

  handleCloseUpdate = () => {
    this.setState({ showUpdateDialog: false, showCommentDialog: false })
  }

  postComment = async () => {
    this.setState({ updating: true })
    const { userUpdate, currentVisibility, currentComment } = this.state
    if (currentVisibility === 'public') {
      await saveUserComment(userUpdate, currentComment)
    } else {
      await savePrivateUserComment(userUpdate, currentComment)
    }
    await this.loadComments()
    this.setState({
      showUpdateDialog: false,
      showCommentDialog: false,
      updating: false,
    })
  }

  postUpdate = async () => {
    this.setState({ updating: true })
    const { userUpdate, currentComment } = this.state
    await saveOwnerComment(userUpdate, currentComment)
    await this.loadComments()
    this.setState({
      showUpdateDialog: false,
      showCommentDialog: false,
      updating: false,
    })
  }

  saveDraftUpdate = async () => {
    const { userUpdate, currentComment } = this.state
    await saveDraftOwnerComment(userUpdate, currentComment)
    await this.loadComments()
  }

  handleChangeText = e => {
    this.setState({ userUpdate: e.target.value })
  }

  render() {
    const {
      myComments,
      myUpdates,
      myPrivateComments,
      myDraftUpdates,
      loading,
      userUpdate,
      showCommentDialog,
      showUpdateDialog,
      currentVisibility,
      updating,
    } = this.state

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
                {this.renderComments(myPrivateComments, data)}
                <Divider light />
                {this.renderComments(myUpdates, data)}
                {this.renderComments(myDraftUpdates, data)}
              </>
            )}
            {UserCommentDialog({
              userUpdate,
              showUpdateDialog: showCommentDialog,
              updating,
              visibility: currentVisibility,
              handleCloseUpdate: this.handleCloseUpdate,
              handleChangeVisibility: this.handleChangeVisibility,
              handleChangeText: this.handleChangeText,
              postComment: this.postComment,
            })}
            {OwnerCommentDialog({
              userUpdate,
              showUpdateDialog: showUpdateDialog,
              updating,
              visibility: currentVisibility,
              handleCloseUpdate: this.handleCloseUpdate,
              handleChangeVisibility: this.handleChangeVisibility,
              handleChangeText: this.handleChangeText,
              saveDraftUpdate: this.saveDraftUpdate,
              postComment: this.postUpdate,
            })}
          </>
        )}
      />
    )
  }
}

export default MyComments
