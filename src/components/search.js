import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Index } from 'elasticlunr'
import { withStyles } from '@material-ui/core/styles'
import { Link, graphql, StaticQuery } from 'gatsby'
import { List, ListItem, Typography, Grid, IconButton, InputBase, Paper } from '@material-ui/core'
import { Apps } from '@material-ui/icons';
import Img from 'gatsby-image'

const styles = theme => ({
  SearchField: {
    borderRadius: 4,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
  },
  AppsIcon: {
    color: 'gray',
  },
  SearchResult: {
    color: theme.palette.common.white,
  },
  paper: {
    padding: 1,
    height: 50,
  }
})

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    const { classes } = this.props
    return (
      <StaticQuery
        query={graphql`
          query SearchQuery {
            allApps {
              edges {
                node {
                  appcoid: id__normalized
                  localFile {
                    id
                    childImageSharp {
                      fixed(width: 36, height: 36) {
                        ...GatsbyImageSharpFixed
                      }
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => {
          return (
            <Paper className={classes.paper}>
              <IconButton className={classes.iconButton} aria-label="Menu">
                <Apps className={classes.AppsIcon} />
              </IconButton>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                variant="outlined"
                value={this.state.query}
                onChange={this.search}
                inputProps={{ 'aria-label': 'Search' }}
              />
              <List>
                {this.state.results.map(page => {
                  const appNodes = data.allApps.edges.filter(
                    e => e.node.appcoid === page.appcoid
                  )
                  const icon =
                    appNodes.length > 0 &&
                    appNodes[0].node.localFile &&
                    appNodes[0].node.localFile.childImageSharp ? (
                      <Img
                        fixed={appNodes[0].node.localFile.childImageSharp.fixed}
                      />
                    ) : (
                      <div width="36" height="36" />
                    )
                  return (
                    <ListItem
                      key={page.id}
                      button
                      onClick={() => {
                        navigate('/appco/' + page.appcoid)
                      }}
                    >
                      <ListItemAvatar>{icon}</ListItemAvatar>
                      <ListItemText>
                        <Typography
                          align="left"
                          className={classes.SearchResult}
                        >
                          <b>{page.name}</b>
                          {': ' + page.category} {' : ' + page.description}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Paper>
          )
        }}
      />
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Search)
