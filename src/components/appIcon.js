import React from 'react'
import Img from 'gatsby-image'
import AppsIcon from '@material-ui/icons/Apps'
import { styles } from './layout'

const AppIcon = ({ app, component, style, big }) => {
  if (app && app.localFile && app.localFile.childImageSharp) {
    return (
      <Img
        fixed={app.localFile.childImageSharp.fixed}
        component={component}
        style={style}
      />
    )
  } else {
    return <AppsIcon style={big ? styles.bigIcon : styles.smallIcon} />
  }
}

export default AppIcon
