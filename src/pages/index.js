import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Typography, Grid } from '@material-ui/core'
import AllComments from '../components/allComments'
import AppCoMonth from '../components/appcoMonth'
import Post from '../components/post'
import AppUpdate from '../components/appUpdate'
import LoggedOut from '../components/loggedOut'
import ReviewAppsSuggestions from '../components/reviewAppsSuggestions'
import HelpCommunity from '../components/helpCommunity'
import { allPost } from '../components/posts'

import { RADIKS_SERVER_URL, APP_CENTER_URL } from '../components/constants'

export default ({ data }) => {
  const [state, setState] = useState({
    loading: true,
    apiComments: [],
    error: null,
  })

  useEffect(() => {
    function loadOwnerComments() {
      fetch(RADIKS_SERVER_URL + '/api/ownercomments', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          return response.json()
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
          setState({
            loading: false,
            apiComments: comments,
          })
        })
        .catch(err => {
          console.log('error', err)
          setState({ loading: false, error: err })
        })
    }

    loadOwnerComments()
  }, [])

  const { apiComments } = state
  const posts = allPost(data)
  const compareDates = date => p => {
    return p.post.date < date
  }
  let c, date
  for (let i in apiComments) {
    c = apiComments[i]
    date = new Date(c.createdAt)
    const index = posts.findIndex(compareDates(date))
    posts.splice(index, 0, { type: 'apiUpdate', post: c })
  }
  const postComponents = posts.map(p => {
    if (p.type === 'appCoMonth') {
      return (
        <AppCoMonth
          key={p.post.path}
          title={p.post.title}
          path={p.post.path}
          date={p.post.date.toLocaleDateString()}
          newOnly={p.post.newOnly}
        />
      )
    } else if (p.type === 'post') {
      return <Post key={'post' + p.post.date} node={p.post.node} />
    } else if (p.type === 'appUpdate') {
      return (
        <AppUpdate
          key={p.post.link}
          link={p.post.link}
          title={p.post.title}
          date={p.post.date.toLocaleDateString()}
          description={p.post.description}
          appcoId={p.post.appcoId}
        />
      )
    } else if (p.type === 'apiUpdate') {
      return <AppUpdate key={p.post._id} apiComment={p.post} />
    } else {
      return null
    }
  })
  return (
    <Layout>
      <SEO
        title="OI App Center"
        keywords={[`app center`, `application`, `blockstack`]}
        meta={[
          {
            name: `og:image`,
            content: `${APP_CENTER_URL}/${data.ogImage.childImageSharp.fluid.src}`,
          },
        ]}
      />
      <Grid container spacing={2} style={{ paddingTop: 40 }}>
        <Grid item xs={12} sm={8}>
          <ReviewAppsSuggestions />
          <LoggedOut />
          <HelpCommunity />
          <AllComments />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" align="center">
            News and Updates
          </Typography>
          {postComponents}
        </Grid>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
    ogImage: file(relativePath: { eq: "hero-img.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
