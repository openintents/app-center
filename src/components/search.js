import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Index } from 'elasticlunr'
import { withStyles } from '@material-ui/core/styles';
import { Link, graphql, StaticQuery } from 'gatsby'
import { List, ListItem, Typography, Grid, TextField, InputAdornment } from '@material-ui/core'
import { Apps } from '@material-ui/icons';
import Img from 'gatsby-image'
// Search component

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    const { classes } = this.props;
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
                      fixed(width: 24, height: 24) {
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
                className={classes.margin}
                style={{color:'gray',backgroundColor:'white'}}
                id="input-with-icon-textfield"
                placeholder="Search"
                value={this.state.query}
                onChange={this.search}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Apps />
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
                      <div width="24px" height="24px" />
                    )
                  return (
                    <ListItem key={page.id}>
                      <Link
                        to={'/appco/' + page.appcoid}
                        style={{
                          color: `white`,
                          fontWeight: 'bold',
                          textDecoration: `none`,
                        }}
                      >
                        <Grid container>
                          <Grid item xs={1}>
                            {icon}
                          </Grid>
                          <Grid item xs={11}>
                            <Typography>
                              <b>{page.name}</b>
                              {': ' + page.category} {' : ' + page.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Link>
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
};

export default withStyles(styles)(Search);
