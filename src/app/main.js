import React from 'react'
import { graphql, Link, StaticQuery, navigate } from 'gatsby'
import { encryptContent, loadMyData } from './services/blockstack'
import {
  UserComment,
  OwnerComment,
  PrivateUserComment,
} from '../components/model'
import {
  Typography,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
} from '@material-ui/core'
import { User } from 'radiks/lib'
import { SmallRating } from './mycomments'
import Img from 'gatsby-image'

class Main extends React.Component {
  state = {
    myApps: {},
    myComments: [],
    myUpdates: [],
    loadingApps: true,
    loadingComments: true,
    loadingUpdates: true,
    loading: true,
  }

  componentDidMount() {
    if (window.location.hash === '#apps') {
      navigate('/data/apps')
    } else if (window.location.hash === '#comments') {
      navigate('/data/comments')
    } else {
      User.createWithCurrentUser().then(() => {
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
      })
    }
  }

  handleClick(event) {
    const encryptedMessage = encryptContent(this.state.message)
    this.setState({ encryptedMessage })
  }

  handleChange(event) {
    this.setState({ message: event.target.value })
  }

  renderApps(myApps, data) {
    const apps = []
    if (myApps) {
      Object.keys(myApps).forEach(key => {
        if (myApps[key]) {
          const appEditLink = `/appco/${key.substr(4)}`
          const app = data.allApps.edges.filter(edge => {
            return edge.node.appcoid.toString() === key.substr(4)
          })[0].node
          apps.push(
            <ListItem key={app.appcoid}>
              <ListItemText
                primary={
                  <>
                    <Link to={appEditLink}>{app.name}</Link>
                  </>
                }
              />
            </ListItem>
          )
        }
      })
    } else {
      apps.push(
        <ListItem key="empty">
          <ListItemText
            primary={
              <>
                <Link to="/data/apps">Add your apps</Link>
              </>
            }
          />
        </ListItem>
      )
    }
    return <List>{apps}</List>
  }

  renderComments(myComments, data) {
    const comments = []

    if (myComments && myComments.length > 0) {
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
            <div width="24" height="24" />
          )
        const appLabel =
          apps.length === 1 ? <>{apps[0].node.name}</> : <>{c.attrs.object}</>

        if (apps.length === 1) {
          comments.push(
            <ListItem key={c._id}>
              <ListItemAvatar>{icon}</ListItemAvatar>
              <ListItemText
                primary={<>{c.attrs.comment}</>}
                secondary={
                  <>
                    {appLabel}
                    {rating}
                  </>
                }
              />
            </ListItem>
          )
        } else {
          comments.push(
            <ListItem key={c._id}>
              <ListItemAvatar>{icon}</ListItemAvatar>
              <ListItemText primary={<>{c.attrs.comment}</>} />
            </ListItem>
          )
        }
      })
    } else {
      comments.push(
        <ListItem key="empty">
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

  renderUpdates(myUpdates, data) {
    const updates = []
    if (myUpdates) {
      console.log(myUpdates)
      myUpdates.forEach(c => {
        const apps = data.allApps.edges.filter(
          e => e.node.website === c.attrs.object
        )
        let comment
        if (
          typeof c.attrs.comment === 'string' ||
          c.attrs.comment instanceof String
        ) {
          comment = c.attrs.comment
        } else {
          comment = '** Decryption failed. **'
        }
        if (apps.length === 1) {
          updates.push(
            <ListItem key={c._id}>
              <ListItemText
                primary={<>{comment}</>}
                secondary={<>For {apps[0].node.name}</>}
              />
            </ListItem>
          )
        } else {
          updates.push(
            <ListItem key={c._id}>
              <ListItemText primary={<>{comment}</>} />
            </ListItem>
          )
        }
      })
    } else {
      updates.push(
        <ListItem>
          <ListItemText primary="Add updates to your apps" />
        </ListItem>
      )
    }
    return <List>{updates}</List>
  }

  render() {
    const { myApps, myComments, myUpdates } = this.state

    return (
      <StaticQuery
        query={graphql`
          query MainAppsQuery {
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
            <Typography variant="h3">Overview</Typography>
            <Typography variant="h4">Your Comments</Typography>
            {this.renderComments(myComments, data)}
            <Typography variant="h4">Your Apps</Typography>
            {this.renderApps(myApps, data)}
            <Typography variant="h4">Your App Updates</Typography>
            {this.renderUpdates(myUpdates, data)}
          </>
        )}
      />
    )
  }
}

export default Main
