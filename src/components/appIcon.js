import React from 'react'
import Img from 'gatsby-image'
import AppsIcon from '@material-ui/icons/Apps'
import { styles } from './layout'

const AppIcon = ({ app }) => {
  if (app) {
    return <Img fixed={app.node.localFile.childImageSharp.fixed} />
  } else {
    return <AppsIcon style={styles.smallIcon} />
  }
}

export default AppIcon
