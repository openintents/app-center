import { graphql } from 'gatsby'
import React, { useState, useEffect } from 'react'
import { Index } from 'elasticlunr'
import App from '../components/app'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { List } from '@material-ui/core'
import { APP_CENTER_URL } from '../components/constants'
import queryString from 'query-string'

export const query = graphql`
  query search {
    allApps(sort: { fields: [name] }) {
      totalCount
      edges {
        node {
          ...AppInformation
          ...AppIcon
        }
      }
    }
    allAppMetaDataJson {
      edges {
        node {
          id
          authors
        }
      }
    }
    allAuthors: allAppPublishersJson {
      edges {
        node {
          ...AppPublisher
        }
      }
    }
    siteSearchIndex {
      index
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

const Search = ({ data, location }) => {
  const [result, setResult] = useState([])
  const [index, setIndex] = useState(undefined)

  useEffect(() => {
    setIndex(Index.load(data.siteSearchIndex.index))
  }, [data.siteSearchIndex])

  useEffect(() => {
    if (index && data && location) {
      const query = queryString.parse(location.search).q
      console.log(`searching for "${query}"`)
      setResult(
        index
          .search(query, { expand: true })
          .map(({ ref }) => index.documentStore.getDoc(ref))
          .map(doc => {
            const app = data.allApps.edges.find(
              app => doc.appcoid === app.node.appcoid
            )
            return app || doc
          })
      )
    }
  }, [location, data, index])

  return (
    <Layout hideSearch>
      <SEO
        title="OI App Center"
        keywords={[`app center`, `application`, `blockstack`]}
        meta={[
          {
            property: 'og:image',
            content: `${APP_CENTER_URL}/${data.ogImage.childImageSharp.fluid.src}`,
          },
        ]}
      />
      {index && (
        <List>
          {result.map(function(d, idx) {
            if (!d.node) {
              return null
            }
            return (
              <App
                key={idx}
                data={d.node}
                showSourceLink
                allAuthors={data.allAuthors}
              />
            )
          })}
        </List>
      )}
    </Layout>
  )
}

export default Search
