import React from 'react'
import { graphql, Link, StaticQuery, navigate } from 'gatsby'
import {
  Typography,
  ListItem,
  ListItemText,
  List,
  Button,
  ListItemAvatar,
} from '@material-ui/core'
import { UserComment, PrivateUserComment } from '../components/model'
import { User } from 'radiks/lib'
import { loadMyData, isSignedIn } from '../app/services/blockstack'
import { SmallRating } from '../app/mycomments'
import Img from 'gatsby-image'

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
    UserComment.fetchList({sort: '-createdAt'}).then(allComments => {
      this.setState({
        allComments,
        loadingComments: false,
        loading: this.state.loadingApps,
      })
    })
  }

  handleClick(appLink) {
    navigate(appLink)
  }

  renderComments(myComments, data) {
    const comments = []
    if (myComments) {
      myComments.forEach(c => {
        const apps = data.allApps.edges.filter(
          e => e.node.website === c.attrs.object
        )
        const icon =
          apps.length > 0 &&
          apps[0].node.localFile &&
          apps[0].node.localFile.childImageSharp ? (
            <Img component="span" fixed={apps[0].node.localFile.childImageSharp.fixed} />
          ) : (
            <div width="24px" height="24px" />
          )
        const appLabel =
          apps.length === 1 ? (
            <>
              {apps[0].node.name}
            </>
          ) : (
            <>
              {c.attrs.object}
            </>
          )
        const appLink =
          apps.length === 1 ? `/appco/${apps[0].node.appcoid}` : c.attrs.object
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
          <ListItem
            button
            key={c._id}
            onClick={() => this.handleClick(appLink)}
          >
            <ListItemAvatar>
              {icon}
            </ListItemAvatar>
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
                  localFile {
                    id
                    childImageSharp {
                      fixed(width: 24, height: 24) {
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
            {loading && <Typography>Loading...</Typography>}
            {!loading && isSignedIn && (
              <>
                <Typography variant="h5">Comments</Typography>
                {this.renderComments(allComments, data)}
              </>
            )}
            {!loading && !isSignedIn && (
              <>
                <Typography variant="h5">Comments</Typography>
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
