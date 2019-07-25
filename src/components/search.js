import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Index } from 'elasticlunr'
import { withStyles } from '@material-ui/core/styles'
import { graphql, StaticQuery } from 'gatsby'
import { Typography, TextField, InputAdornment, Box } from '@material-ui/core'
import { Apps } from '@material-ui/icons'
import Img from 'gatsby-image'
import Autosuggest from 'react-autosuggest'
import AppsIcon from '@material-ui/icons/Apps'
import { styles } from './layout'

const searchStyles = theme => {
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
    SearchResultHighlighted: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.main,
    },
    SuggestionsContainer: {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: theme.palette.primary.main,
      boxShadow: `1px 1px 9px 1px ` + theme.palette.secondary.main,
    },
  }
}

class Search extends Component {
  state = {
    query: ``,
    results: [],
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
            <div className={classes.paper}>
              <Autosuggest
                suggestions={this.state.results}
                onSuggestionsFetchRequested={this.search}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion(data, classes)}
                renderInputComponent={this.renderInputComponent}
                renderSuggestionsContainer={this.renderSuggestionsContainer}
                onSuggestionSelected={this.onSuggestionSelected}
                highlightFirstSuggestion={true}
                inputProps={{
                  value: this.state.query,
                  onChange: this.onChange,
                }}
              />
            </div>
          )
        }}
      />
    )
  }

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    const { suggestionSelectedCallback } = this.props
    suggestionSelectedCallback(suggestion)
  }

  renderSuggestionsContainer = ({ containerProps, children }) => {
    const { classes } = this.props

    return (
      <Box {...containerProps} className={classes.SuggestionsContainer}>
        {children}
      </Box>
    )
  }

  renderInputComponent = inputProps => {
    return (
      <TextField
        variant="outlined"
        placeholder="Find apps by name, category,.."
        margin="dense"
        InputProps={{
          className: this.props.classes.SearchField,
          startAdornment: (
            <InputAdornment position="start">
              <Apps
                className={this.props.classes.AppsIcon}
                style={{ width: 24, height: 24 }}
              />
            </InputAdornment>
          ),
        }}
        {...inputProps}
      />
    )
  }

  renderSuggestion = (data, classes) => (
    suggestion,
    { query, isHighlighted }
  ) => {
    const appNodes = data.allApps.edges.filter(
      e => e.node.appcoid === suggestion.appcoid
    )
    const icon =
      appNodes.length > 0 &&
      appNodes[0].node.localFile &&
      appNodes[0].node.localFile.childImageSharp ? (
        <Img fixed={appNodes[0].node.localFile.childImageSharp.fixed} />
      ) : (
        <AppsIcon style={styles.smallIcon} />
      )

    return (
      <>
        <Typography
          component="div"
          align="left"
          className={
            isHighlighted
              ? classes.SearchResultHighlighted
              : classes.SearchResult
          }
        >
          {icon} <b>{suggestion.name}</b>
          <br />
          <small>{suggestion.category}</small>
          <br />
          {suggestion.description}
        </Typography>
      </>
    )
  }

  getSuggestionValue = suggestion => {
    return suggestion.name
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      results: [],
    })
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      query: newValue,
    })
  }

  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = ({ value }) => {
    const query = value
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
  suggestionSelectedCallback: PropTypes.func.isRequired,
}

export default withStyles(searchStyles)(Search)
