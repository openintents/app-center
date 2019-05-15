import React from "react";
import { graphql } from "gatsby";

export const numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const App = ({ data }) => {
  const earnings = numberFormat.format(data.lifetimeEarnings)
  return <>
    <a href={`/appco/${data.appcoid}`}>{data.name}</a>
    {data.openSourceUrl &&
    (<>{' '}(<a href={data.openSourceUrl}>{data.openSourceUrl}</a>)</>)}<br/>
    rewards: {earnings} {data.openSourceUrl &&  (<><br/>last update: {data.fields.lastCommit}</>)}
    <br/><a href={data.website}>Launch app</a>
  </>
};

export const query = graphql`
fragment AppInformation on apps {
      appcoid:id__normalized
      name
      website
      lifetimeEarnings
      openSourceUrl
      fields {
        lastCommit
      }
}
`

export default App;

