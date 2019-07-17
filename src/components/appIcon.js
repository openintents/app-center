import React from 'react'
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

const AppIcon = ({ app }) => {
  if (app) {
    return <Img fixed={app.node.localFile.childImageSharp.fixed} />
  } else {
    return <div style={{ width: 24, height: 24 }} />
  }
}

export default AppIcon
