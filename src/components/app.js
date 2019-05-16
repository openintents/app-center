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
const App = ({ data, hideRewards, hideDetailsLink }) => {
  const earnings = numberFormat.format(data.lifetimeEarnings)
  var lastUpdate = ''
  if (data.openSourceUrl) {
    const lastCommitDate = Date.parse(data.fields.lastCommit)
    if (isNaN(lastCommitDate)) {
      lastUpdate = data.fields.lastCommit
    } else {
      lastUpdate = commitFormat.format(lastCommitDate)
    }
  }

  return (
    <>
      {!hideDetailsLink && <a href={`/appco/${data.appcoid}`}>{data.name}</a>}
      {hideDetailsLink && <>{data.name}</>}
      {data.openSourceUrl && (
        <>
          {' '}
          (<a href={data.openSourceUrl}>{data.openSourceUrl}</a>)
        </>
      )}
      {!hideRewards && (
        <>
          <br />
          rewards: {earnings}{' '}
        </>
      )}
      {data.openSourceUrl && (
        <>
          <br />
          last update: {lastUpdate}
        </>
      )}
      <br />
      {data.website && data.website.length > 0 && (
        <a href={data.website}>Launch app</a>
      )}
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
