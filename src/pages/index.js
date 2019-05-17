import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

class IndexPage extends React.Component {

  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`, `blockstack`]} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p>
              Information about participating apps
            </p>
            <ul>
              <li>
                <Link to="/appco-foss/">Open Source apps</Link>
              </li>
              <li>
                <Link to="/appco-noss/">Closed Source apps</Link>
              </li>
              <li>
                <Link to="/appco-new/">New apps</Link>
              </li>
              <li>
                <Link to="/appco-out/">Retired apps</Link>
              </li>
              <li>
                You can{' '}
                <a href="https://gitlab.com/friedger/appcostats">
                  view source here
                </a>
              </li>
              <li>
                or {' '}
                <a href="https://docs.blockstack.org/develop/mining_intro.html">
                  read more about the App Mining program
                </a>
              </li>
            </ul>
            <hr />
          </div>
          <div
            style={{
              borderLeft: 'brown',
              borderLeftStyle: 'dashed',
              paddingLeft: '3rem',
            }}
          >
            <p>
                Feedback section is still under development:
                </p>
                <ul>
                  <li>
                    <Link to="/app/">
                      <b>Go to Feedback section (with Blockstack)</b>
                    </Link>{' '}
                  </li>
                </ul>

            <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
              <Image />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
