import React from 'react'
import { graphql, Link, StaticQuery, navigate } from 'gatsby'
import {
  Typography,
  ListItem,
  ListItemText,
  List,
  Button,
} from '@material-ui/core'
import { UserComment, PrivateUserComment } from '../components/model'
import { User } from 'radiks/lib'
import { loadMyData, isSignedIn } from '../app/services/blockstack'
import { SmallRating } from '../app/mycomments'

class AllComments extends React.Component {
  state = {
    myApps: {},
    allComments: [],
    loading: true,
    loadingApps: true,
    loadingComments: true,
    isSignedIn: false,
  }

  componentDidMount() {
    if (isSignedIn()) {
      User.createWithCurrentUser().then(() => {
        loadMyData().then(content => {
          this.setState({
            myApps: content.myApps,
            loadingApps: false,
            loading: this.state.loadingComments,
            isSignedIn: true,
          })
        })
        this.loadComments()
      })
    } else {
      this.setState({ loading: false, isSignedIn: false })
    }
  }

  loadComments() {
    UserComment.fetchList().then(allComments => {
      this.setState({
        allComments,
        loadingComments: false,
        loading: this.state.loadingApps,
      })
    })
  }

  handleClick(comment) {
    if (window) {
      window.location.href = comment.attrs.object
    }
  }

  renderComments(myComments, data) {
    const comments = []
    if (myComments) {
      myComments.forEach(c => {
        const apps = data.allApps.edges.filter(
          e => e.node.website === c.attrs.object
        )
        const appLabel =
          apps.length === 1
            ? `For ${apps[0].node.name}`
            : `For ${c.attrs.object}`
        const rating = [
          UserComment.modelName(),
          PrivateUserComment.modelName(),
        ].includes(c.modelName()) ? (
          <>
            <br />
            <SmallRating component="span" readOnly value={c.attrs.rating} />
          </>
        ) : null
        const comment = c.attrs.comment.toString()
        comments.push(
          <ListItem button key={c._id} onClick={() => this.handleClick(c)}>
            <ListItemText
              primary={<>{comment}</>}
              secondary={
                <>
                  {appLabel}
                  {rating}
                </>
              }
            />
          </ListItem>
        )
      })
    } else {
      comments.push(
        <ListItem>
          <ListItemText
            primary={
              <>
                <Link to="/appco-foss">Be the first to comment</Link>
              </>
            }
          />
        </ListItem>
      )
    }
    return <List>{comments}</List>
  }

  render() {
    const { allComments, loading, isSignedIn } = this.state

    return (
      <StaticQuery
        query={graphql`
          query AllCommentsQuery {
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
            {!loading && isSignedIn && (
              <>
                <Typography variant="h3">Comments</Typography>
                {this.renderComments(allComments, data)}
              </>
            )}
            {!loading && !isSignedIn && (
              <>
                <Typography variant="h3">Comments</Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/data/login')}
                >
                  Sign In to view comments
                </Button>
              </>
            )}
          </>
        )}
      />
    )
  }
}

export default AllComments
