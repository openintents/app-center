import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { loadMyData } from './services/blockstack'
import {
  Typography,
  ListItem,
  ListItemText,
  List,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  withStyles,
} from '@material-ui/core'
import {
  UserComment,
  OwnerComment,
  PrivateUserComment,
  DraftOwnerComment,
  saveDraftOwnerComment,
  saveOwnerComment,
  saveUserComment,
  savePrivateUserComment,
} from '../components/model'
import DeleteIcon from '@material-ui/icons/Delete'
import Rating from 'material-ui-rating'
import { User } from 'radiks/lib'
import UserCommentDialog from '../components/userCommentDialog'
import OwnerCommentDialog from '../components/ownerCommentDialog'
import { styles } from '../components/layout'
import Img from 'gatsby-image'

const smallStyles = {
  iconButton: {
    width: 24,
    height: 24,
    padding: 0,
  },
  icon: {
    width: 16,
    height: 16,
  },
}
export const SmallRating = withStyles(smallStyles)(Rating)

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
    rating: 0,
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
    const myPrivateComments = this.state.myPrivateComments.filter(
      item => item !== comment
    )
    const myUpdates = this.state.myUpdates.filter(item => item !== comment)
    const myDraftUpdates = this.state.myDraftUpdates.filter(
      item => item !== comment
    )
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

        const rating = [
          UserComment.modelName(),
          PrivateUserComment.modelName(),
        ].includes(c.modelName()) ? (
          <>
            <br />
            <SmallRating component="span" readOnly value={c.attrs.rating} />
          </>
        ) : null

        const icon =
          apps.length > 0 &&
          apps[0].node.localFile &&
          apps[0].node.localFile.childImageSharp ? (
            <Img fixed={apps[0].node.localFile.childImageSharp.fixed} />
          ) : (
            <div width="16px" height="16px" />
          )
        const appLabel =
          apps.length === 1 ? (
            <>
              {icon} {apps[0].node.name}
            </>
          ) : (
            <>
              {icon} {c.attrs.object}
            </>
          )
        comments.push(
          <ListItem button key={c._id} onClick={() => this.handleClick(c)}>
            <ListItemText
              primary={<>{c.attrs.comment}</>}
              secondary={
                <>
                  {appLabel}
                  {rating}
                </>
              }
            />
            <ListItemSecondaryAction onClick={() => this.handleDeleteClick(c)}>
              <IconButton aria-label="Delete">
                <DeleteIcon stlye={styles.smallIcon} />
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

  handleChangeRating = value => {
    this.setState({ rating: value })
  }

  handleCloseUpdate = () => {
    this.setState({ showUpdateDialog: false, showCommentDialog: false })
  }

  postComment = async () => {
    this.setState({ updating: true })
    const { userUpdate, rating, currentVisibility, currentComment } = this.state
    if (currentVisibility === 'public') {
      await saveUserComment(userUpdate, rating, currentComment)
    } else {
      await savePrivateUserComment(userUpdate, rating, currentComment)
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
      rating,
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
                  localFile {
                    id
                    childImageSharp {
                      fixed(width: 16, height: 16) {
                        ...GatsbyImageSharpFixed
                      }
                    }
                  }
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
              rating,
              visibility: currentVisibility,
              handleCloseUpdate: this.handleCloseUpdate,
              handleChangeVisibility: this.handleChangeVisibility,
              handleChangeText: this.handleChangeText,
              handleChangeRating: this.handleChangeRating,
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
