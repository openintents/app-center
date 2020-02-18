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
  ListItemAvatar,
  CircularProgress,
  Container,
  CardHeader,
  Card,
  CardContent,
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
import AppsIcon from '@material-ui/icons/Apps'
import CommentIcon from '@material-ui/icons/Note'
import Rating from 'material-ui-rating'
import { User } from 'radiks/lib'
import UserCommentDialog from '../components/userCommentDialog'
import OwnerCommentDialog from '../components/ownerCommentDialog'
import { styles, LayoutContext } from '../components/layout'
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
  static contextType = LayoutContext
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
    UserComment.fetchOwnList({ sort: '-createdAt' }).then(myComments => {
      this.setState({
        myComments,
        loadingComments: false,
        loading: this.state.loadingApps && this.state.loadingUpdates,
      })
    })
    PrivateUserComment.fetchOwnList({ sort: '-createdAt' }).then(
      myPrivateComments => {
        this.setState({
          myPrivateComments,
          loadingComments: false,
          loading: this.state.loadingApps && this.state.loadingUpdates,
        })
      }
    )

    OwnerComment.fetchOwnList({ sort: '-createdAt' }).then(myUpdates => {
      this.setState({
        myUpdates,
        loadingUpdates: false,
        loading: this.state.loadingApps && this.state.loadingComments,
      })
    })
    DraftOwnerComment.fetchOwnList({ sort: '-createdAt' }).then(
      myDraftUpdates => {
        this.setState({
          myDraftUpdates,
          loadingUpdates: false,
          loading: this.state.loadingApps && this.state.loadingUpdates,
        })
      }
    )
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
      rating: comment.attrs.rating,
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

        const isNotPublic = [
          DraftOwnerComment.modelName(),
          PrivateUserComment.modelName(),
        ].includes(c.modelName())

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
            <AppsIcon style={styles.smallIcon} />
          )
        const appLabel =
          apps.length === 1 ? <>{apps[0].node.name}</> : <>{c.attrs.object}</>
        comments.push(
          <ListItem button key={c._id} onClick={() => this.handleClick(c)}>
            <ListItemAvatar>{icon}</ListItemAvatar>
            <ListItemText
              primary={<>{c.attrs.comment}</>}
              secondary={
                <>
                  {appLabel}
                  {rating}
                  {isNotPublic && (
                    <>
                      <br />
                      not published
                    </>
                  )}
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

  postComment = async ({ visibility: currentVisibility }) => {
    this.setState({ updating: true })
    const { userUpdate, rating, currentComment } = this.state
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

    const { isSignedIn } = this.context

    return (
      <StaticQuery
        query={graphql`
          query MyCommentsQuery {
            allApps(sort: { fields: [name] }) {
              edges {
                node {
                  ...AppInformation
                  ...AppIcon
                }
              }
            }
          }
        `}
        render={data => (
          <>
            {loading && (
              <Container style={{ margin: 40 }}>
                <CircularProgress size={36} />
                <Typography component="span"> Loading reviews...</Typography>
              </Container>
            )}
            {!loading && (
              <Card style={{ margin: 4 }}>
                <CardHeader
                  title={<Typography variant="h5">Reviews</Typography>}
                  avatar={<CommentIcon style={styles.smallIcon} />}
                />
                <CardContent>
                  {this.renderComments(myComments, data)}
                  {this.renderComments(myPrivateComments, data)}
                  <Divider light />
                  {this.renderComments(myUpdates, data)}
                  {this.renderComments(myDraftUpdates, data)}
                </CardContent>
              </Card>
            )}
            {UserCommentDialog({
              userUpdate,
              showUpdateDialog: showCommentDialog,
              updating,
              rating,
              isSignedIn,
              handleCloseUpdate: this.handleCloseUpdate,
              handleChangeText: this.handleChangeText,
              handleChangeRating: this.handleChangeRating,
              postComment: this.postComment,
            })}
            {OwnerCommentDialog({
              userUpdate,
              showUpdateDialog: showUpdateDialog,
              updating,
              isSignedIn,
              handleCloseUpdate: this.handleCloseUpdate,
              handleChangeText: this.handleChangeText,
              saveDraftUpdate: this.saveDraftUpdate,
              postUpdate: this.postUpdate,
            })}
          </>
        )}
      />
    )
  }
}

export default MyComments
