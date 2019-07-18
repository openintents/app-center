import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Index } from 'elasticlunr'
import { withStyles } from '@material-ui/core/styles'
import { graphql, StaticQuery, navigate } from 'gatsby'
import {
  List,
  ListItem,
  Typography,
  TextField,
  InputAdornment,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core'
import { Apps } from '@material-ui/icons'
import Img from 'gatsby-image'

const styles = theme => {
  return {
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
  }
}

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
            <div>
              <TextField
                id="input-with-icon-textfield"
                placeholder="Find apps by name, category,.."
                variant="outlined"
                value={this.state.query}
                onChange={this.search}
                margin="dense"
                InputProps={{
                  className: classes.SearchField,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Apps
                        className={classes.AppsIcon}
                        style={{ width: 24, height: 24 }}
                      />
                    </InputAdornment>
                  ),
                }}
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
            </div>
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
