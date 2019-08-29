import React, { useContext } from 'react'
import { graphql, navigate, useStaticQuery } from 'gatsby'

import { Typography, Card, CardContent, Grid, Button } from '@material-ui/core'
import FossIcon from '@material-ui/icons/FolderOpen'
import NossIcon from '@material-ui/icons/Folder'
import { styles, LayoutContext } from '../components/layout'
import Img from 'gatsby-image'

export default () => {
  const { isSignedIn } = useContext(LayoutContext)
  if (isSignedIn) {
    return null
  } else {
    const data = useStaticQuery(graphql`
      query {
        togetherImage: file(relativePath: { eq: "together.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `)
    return (
      <Card style={{ margin: 4 }}>
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={4}>
              <Img fluid={data.togetherImage.childImageSharp.fluid} />
            </Grid>
            <Grid item xs={12} sm={8} container>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  Help the community and add your review
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">
                  <Button
                    onClick={() => navigate('/appco-foss/')}
                    color="primary"
                  >
                    <FossIcon style={styles.smallIcon} />
                    Review Open Source apps
                  </Button>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">
                  <Button
                    onClick={() => navigate('/appco-noss/')}
                    color="primary"
                  >
                    <NossIcon style={styles.smallIcon} />
                    Review Closed Source apps
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}
