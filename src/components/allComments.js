import React from 'react'
import { graphql, Link, StaticQuery, navigate } from 'gatsby'
import {
  Typography,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
} from '@material-ui/core'
import { SmallRating } from '../app/mycomments'
import Img from 'gatsby-image'
import { navigateTo } from 'gatsby'


class AllComments extends React.Component {
  state = {
    myApps: {},
    apiComments: [],
    loading: true,
    loadingApps: true,
    loadingComments: true,
    isSignedIn: false,
  }

  componentDidMount() {
    this.loadUserOwnerComments()
  }

  loadUserOwnerComments() {
    const server = process.env.GATSBY_RADIKS_SERVER
      ? process.env.GATSBY_RADIKS_SERVER
      : 'http://localhost:5000'
    fetch(server + '/api/usercomments', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json()
        //we can make another call here to get the owner comments too from the api
      })
      .then(comments => {
        this.setState({
          loadingAllComments: false,
          loading: false,
          apiComments: comments,
        })
      })
      .catch(err => {
        console.log('error', err)
      })
  }

  handleClick(comment) {
    navigate(comment.object)
  }

  renderComments(apiComments, data) {
    const comments = []
    if (apiComments) {
      apiComments.forEach(c => {
        const apps = data.allApps.edges.filter(e => e.node.website === c.object)
        const icon =
          apps.length > 0 &&
          apps[0].node.localFile &&
          apps[0].node.localFile.childImageSharp ? (
            <Img
              component="span"
              fixed={apps[0].node.localFile.childImageSharp.fixed}
            />
          ) : (
            <div width="24px" height="24px" />
          )
        const appLabel = apps.length === 1
            ? `${apps[0].node.name}`
            : `${c.object}`
        const rating = <>
            <br />
            <SmallRating component="span" readOnly value={c.rating} />
          </>
        const comment = c.comment.toString()
        comments.push(
          <ListItem
            button
            key={c._id}
            onClick={() => this.handleClick(c)}
          >
            <ListItemAvatar>{icon}</ListItemAvatar>
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
    const { apiComments, loading } = this.state

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
            {!loading && (
              <>
                <Typography variant="h5">Comments</Typography>
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
