import React, { useState, useEffect } from 'react'
import AppcoMonth from './appcoMonth'
import AppUpdate from './appUpdate'
import Post from './post'
import { allPost } from '../components/posts'
import { RADIKS_SERVER_URL } from '../components/constants'

export const NewsPosts = ({ size, data }) => {
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
  let posts = allPost(data)
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
  if (size) {
    posts = posts.splice(0, size)
  }
  const postComponents = posts.map(p => {
    if (p.type === 'appCoMonth') {
      return (
        <AppcoMonth
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
  return postComponents
}
