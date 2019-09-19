import React from 'react'
import { graphql, Link, StaticQuery, navigate } from 'gatsby'
import {
  Typography,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  CircularProgress,
  Container,
  CardHeader,
  CardContent,
  Card,
} from '@material-ui/core'
import { SmallRating } from '../app/mycomments'
import Img from 'gatsby-image'
import AppsIcon from '@material-ui/icons/Apps'
import { styles } from './layout'
import { RADIKS_SERVER_URL } from './constants'

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
    fetch(RADIKS_SERVER_URL + '/api/usercomments', {
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
        comments.sort((c1, c2) => {
          if (c1.createdAt - c2.createdAt > 0) {
            return -1
          } else if (c1.createdAt - c2.createdAt < 0) {
            return 1
          } else {
            return 0
          }
        })
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

  handleClick(appLink) {
    navigate(appLink)
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
            <AppsIcon style={styles.smallIcon} />
          )
        const appLabel =
          apps.length === 1 ? <>{apps[0].node.name}</> : <>{c.object}</>
        const appLink =
          apps.length === 1
            ? `/appco/${apps[0].node.appcoid}/#reviews`
            : c.object
        const rating = (
          <>
            <br />
            <SmallRating component="span" readOnly value={c.rating} />
          </>
        )
        const comment = c.comment.toString()
        comments.push(
          <ListItem
            button={appLabel}
            key={c._id}
            onClick={() => {
              if (appLink) {
                this.handleClick(appLink)
              }
            }}
          >
            <ListItemAvatar>{icon}</ListItemAvatar>
            <ListItemText
              primary={<>{comment}</>}
              secondary={
                <>
                  {appLabel}
                  {rating}
                  {c.username || 'A user'}
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
                  ...AppIcon
                }
              }
            }
          }
        `}
        render={data => (
          <>
            {loading && (
              <Container>
                <CircularProgress size={36} />
                <Typography>Loading reviews...</Typography>
              </Container>
            )}
            {!loading && (
              <Card style={{ margin: 4 }}>
              <CardHeader title="Recent Reviews" />
                <CardContent>
                  {this.renderComments(apiComments, data)}
                </CardContent>
              </Card>
            )}
          </>
        )}
      />
    )
  }
}

export default AllComments
