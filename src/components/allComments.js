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
    apiComments: [],
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
    this.loadUserOwnerComments()
  }

  loadUserOwnerComments() {
    console.log('gets loadUserOwnerComments');
    fetch('http://localhost:5000/api/usercomments', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then( (response) => {
      return response.json();
      //we can make another call here to get the owner comments too from the api
    })
    .then( (comments) => {
      console.log('get all comments', comments);
      this.setState({
        loadingAllComments: false,
        loading: false,
        apiComments: comments
      })
    })
    .catch( (err) => {
      console.log('error',err);
    })
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
          e => e.node.website === c.object
        )
        const appLabel =
          apps.length === 1
            ? `${apps[0].node.name}`
            : `${c.object}`
        const rating =<>
            <br />
            <SmallRating component="span" readOnly value={c.rating} />
          </>
        const comment = c.comment.toString()
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
    const { allComments, apiComments, loading, isSignedIn } = this.state

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
            {loading && <Typography>Loading...</Typography>}
            {!loading && (
              <>
                <Typography variant="h5">Recent Comments</Typography>
                {this.renderComments(allComments, data)}
                {this.renderComments(apiComments, data)}
              </>
            )}
          </>
        )}
      />
    )
  }
}

export default AllComments
