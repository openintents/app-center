import React, { Component } from 'react'
import { graphql, navigate } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Typography, Card, CardContent, Grid, Button } from '@material-ui/core'
import FossIcon from '@material-ui/icons/FolderOpen'
import NossIcon from '@material-ui/icons/Folder'
import AllComments from '../components/allComments'
import { styles } from '../components/layout'
import PersonalData from '../components/personalData'
import AppCoMonth from '../components/appcoMonth'
import Post from '../components/post'
import AppUpdate from '../components/appUpdate'
import Img from 'gatsby-image'
class IndexPage extends Component {
  state = {
    loading: true,
    apiComments: [],
    error: null,
  }

  componentDidMount() {
    this.loadOwnerComments()
  }

  loadOwnerComments() {
    console.log('loading owner comments')
    const server = process.env.GATSBY_RADIKS_SERVER
      ? process.env.GATSBY_RADIKS_SERVER
      : 'http://localhost:5000'

    fetch(server + '/api/ownercomments', {
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
        this.setState({
          loading: false,
          apiComments: comments,
        })
      })
      .catch(err => {
        console.log('error', err)
        this.setState({ loading: false, error: err })
      })
  }

  render() {
    const { data } = this.props
    const { apiComments } = this.state
    const posts = [
      {
        type: 'appUpdate',
        post: {
          link:
            'https://blog.graphitedocs.com/the-simple-way-to-remain-gdpr-compliant/',
          title: 'The Simple Way to Remain GDPR Compliant',
          date: new Date('2019-07-15'),
          description:
            'How Graphite can replace Microsoft office 365 in schools in Europe',
          appcoId: '216',
        },
      },
      {
        type: 'appCoMonth',
        post: {
          title: 'App Mining (June 2019)',
          path: '2019-06',
          date: new Date('2019-07-06'),
        },
      },
      {
        type: 'post',
        post: {
          date: new Date('2019-05-09'),
          node: data.allMarkdownRemark.edges[0].node,
        },
      },
      {
        type: 'appCoMonth',
        post: {
          title: 'App Mining (May 2019)',
          path: '2019-05',
          date: new Date('2019-05-05'),
        },
      },
      {
        type: 'appCoMonth',
        post: {
          title: 'App Mining (April 2019)',
          path: '2019-04',
          date: new Date('2019-04-03'),
        },
      },
      {
        type: 'appCoMonth',
        post: {
          title: 'App Mining (March 2019)',
          path: '2019-03',
          date: new Date('2019-04-03'),
        },
      },
      {
        type: 'appCoMonth',
        post: {
          title: 'App Mining (February 2019)',
          path: '2019-02',
          date: new Date('2019-04-03'),
        },
      },
      {
        type: 'appCoMonth',
        post: {
          title: 'App Mining (January 2019)',
          path: '2019-01',
          date: new Date('2019-04-03'),
        },
      },
      {
        type: 'appCoMonth',
        post: {
          title: 'App Mining (December 2018)',
          path: '2018-12',
          date: new Date('2019-04-03'),
          newOnly: true,
        },
      },
    ]

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
      console.log(p)
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
              content: data.ogImage.childImageSharp.fluid.src,
            },
          ]}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Card style={{ margin: 24 }}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={2}>
                    <Img fluid={data.togetherImage.childImageSharp.fluid} />
                  </Grid>
                  <Grid item xs={12} sm={10} container>
                    <Grid item xs={12}>
                      <Typography variant="h6" align="center">
                        Help the community and add your review
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="center">
                        <Button onClick={() => navigate('/appco-foss/')} color="primary">
                          <FossIcon style={styles.smallIcon} />
                          Try Open Source apps
                        </Button>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="center">
                        <Button onClick={() => navigate('/appco-noss/')} color="primary">
                          <NossIcon style={styles.smallIcon} />
                          Try Closed Source apps
                        </Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Typography variant="h5" align="center">News and Updates</Typography>
            {postComponents}
            <Typography variant="body2">
              <a href="https://docs.blockstack.org/develop/mining_intro.html">
                Read more about the App Mining program
              </a>
            </Typography>
          </div>
          <div
            style={{
              paddingLeft: '3rem',
            }}
          >
            <PersonalData />
            <AllComments />
          </div>
        </div>
      </Layout>
    )
  }
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
    togetherImage: file(relativePath: { eq: "together.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 128) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
export default IndexPage
