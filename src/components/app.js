import React from 'react'
import { graphql } from 'gatsby'

export const numberFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
export const commitFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
})
const App = ({ data }) => {
  const earnings = numberFormat.format(data.lifetimeEarnings)
  const lastCommitDate = Date.parse(data.fields.lastCommit)
  if (isNaN(lastCommitDate)) {
    var lastUpdate = data.fields.lastCommit
  } else {
    lastUpdate = commitFormat.format(lastCommitDate)
  }

  return (
    <>
      <a href={`/appco/${data.appcoid}`}>{data.name}</a>
      {data.openSourceUrl && (
        <>
          {' '}
          (<a href={data.openSourceUrl}>{data.openSourceUrl}</a>)
        </>
      )}
      <br />
      rewards: {earnings}{' '}
      {data.openSourceUrl && (
        <>
          <br />
          last update: {lastUpdate}
        </>
      )}
      <br />
      <a href={data.website}>Launch app</a>
    </>
  )
}

export const query = graphql`
  fragment AppInformation on apps {
    appcoid: id__normalized
    name
    website
    lifetimeEarnings
    openSourceUrl
    fields {
      lastCommit
    }
  }
`

export default App
