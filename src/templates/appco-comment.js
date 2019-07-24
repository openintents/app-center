import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Grid from '@material-ui/core/Grid'
import { getUser, checkIsSignedIn } from '../app/services/blockstack'
import { Container, Typography } from '@material-ui/core'

import { UserComment, PrivateUserComment } from '../components/model'
import Img from 'gatsby-image'
import UserCommentDialog from '../components/userCommentDialog'
import SEO from '../components/seo'
import { SmallAppDetails } from '../components/app'

class AppComment extends Component {
  state = {
    rating: 0,
    userUpdate: '',
    userData: null,
    comments: [],
    visibility: 'private',
    privateComments: [],
    loadingComments: false,
    loadingPrivateComments: false,
    loadingUser: true,
    loadingData: true,
  }

  componentDidMount() {
    checkIsSignedIn().then(isSignedIn => {
      setTimeout(() => {
        if (isSignedIn) {
          this.setState({
            loadingUser: false,
            isSignedIn: true,
            userData: getUser(),
          })
          this.loadComments()
        } else {
          this.setState({ isSignedIn: false, loadingUser: false })
        }
      }, 2000)
    })
  }

  loadComments() {
    const { data } = this.props
    this.setState({
      loadingComments: true,
      loadingPrivateComments: true,
    })
    UserComment.fetchOwnList({
      object: data.apps.website,
      sort: '-createdAt',
    }).then(comments => {
      this.setState({
        comments,
        loadingComments: false,
        loadingData: this.state.loadingPrivateComments,
      })
    })
    PrivateUserComment.fetchOwnList({
      object: data.apps.website,
      sort: '-createdAt',
    }).then(privateComments => {
      this.setState({
        privateComments,
        loadingPrivateComments: false,
        loadingData: this.state.loadingComments,
      })
    })
  }

  handleChangeVisibility = event => {
    this.setState({ visibility: event.target.value })
  }

  handleCloseUpdate = () => {
    window.location.replace(window.location.origin + '/comment-thanks')
  }

  handleChangeText = e => {
    this.setState({ userUpdate: e.target.value })
  }

  handleChangeRating = value => {
    this.setState({ rating: value })
  }

  postComment = async () => {
    this.setState({ updating: true })
    const { userUpdate, visibility, rating } = this.state
    const comment =
      visibility === 'public'
        ? new UserComment({
            comment: userUpdate,
            rating,
            object: this.props.data.apps.website,
          })
        : new PrivateUserComment({
            comment: userUpdate,
            rating,
            object: this.props.data.apps.website,
          })
    await comment.save()
    await this.loadComments()
    this.setState({ showUpdateDialog: false, updating: false })
  }

  render() {
    const { data } = this.props
    const {
      visibility,
      rating,
      userUpdate,
      updating,
      isSignedIn,
      loadingUser,
    } = this.state
    const icon =
      data.apps.localFile && data.apps.localFile.childImageSharp ? (
        <Img fixed={data.apps.localFile.childImageSharp.fixed} />
      ) : null
    return (
      <Layout>
        <SEO
          title={data.apps.name}
          description={data.apps.description}
          keywords={[data.apps.name, `application`, `blockstack`]}
        />
        <Grid container alignItems="center" spacing={2}>
          <Grid item>{icon}</Grid>
          <Grid item>
            <Typography variant="h3" align="center">
              {data.apps.name}
            </Typography>
          </Grid>
        </Grid>

        <Container>
          {SmallAppDetails({
            description: data.apps.description,
            lifetimeEarnings: data.apps.lifetimeEarnings,
            lastCommit: data.apps.fields && data.apps.fields.lastCommit,
            openSourceUrl: data.apps.openSourceUrl,
            hideRewards: false,
            showSourceLink: true,
          })}
        </Container>

        {UserCommentDialog({
          userUpdate,
          showUpdateDialog: true,
          updating,
          visibility,
          rating,
          handleCloseUpdate: this.handleCloseUpdate,
          handleChangeVisibility: this.handleChangeVisibility,
          handleChangeText: this.handleChangeText,
          handleChangeRating: this.handleChangeRating,
          postComment: this.postComment,
          modal: true,
          isSignedIn,
          loadingUser,
        })}
        <hr />
      </Layout>
    )
  }
}

export const query = graphql`
  query($appcoid: Int) {
    apps(id__normalized: { eq: $appcoid }) {
      ...AppInformation
      localFile {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`

export default AppComment
