import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.app/gatsby-image
 * - `StaticQuery`: https://gatsby.app/staticquery
 */


const AppCenterIcon = () => (
  <StaticQuery
    query={graphql`
      query {
        appCenterIcon: file(relativePath: { eq: "icon.png" }) {
          childImageSharp {
            fixed(width: 24, height: 24) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <Img fixed={data.appCenterIcon.childImageSharp.fixed} />}
  />
)
export default AppCenterIcon
