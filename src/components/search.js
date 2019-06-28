import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from 'gatsby'

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.query} onChange={this.search} placeholder="Search apps by name, .." />
        <ul>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={"/appco/" + page.appcoid}
              style={{
                color: `white`,
                fontWeight: 'bold',
                textDecoration: `none`,
              }}
              >{page.name}</Link>
              {": " + page.category} {" : " + page.description}
            </li>
          ))}
        </ul>
      </div>
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
        .search(query, {expand:true})
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}