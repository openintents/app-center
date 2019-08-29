import React from 'react'
import SEO from '../components/seo'
import Layout from '../components/layout'
import { APP_CENTER_URL } from '../components/constants'
import { graphql } from 'gatsby'
import { NewsPosts } from '../components/newsPosts'

const Terms = ({ data }) => (
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
    <NewsPosts data={data} />
  </Layout>
)
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

export default Terms
