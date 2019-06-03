import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO
          title="Home"
          keywords={[`app center`, `application`, `blockstack`]}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p>Current Blockstack apps</p>
            <ul>
              <li>
                <Link to="/appco-foss/">Open Source apps</Link>
              </li>
              <li>
                <Link to="/appco-noss/">Closed Source apps</Link>
              </li>
            </ul>
            <p>App Mining (May 2019)</p>
            <ul>
              <li>
                <Link to="/2019-05/appco-new/">New apps</Link>
              </li>
              <li>
                <Link to="/2019-05/appco-out/">Retired apps</Link>
              </li>
            </ul>
            <p>App Mining (April 2019)</p>
            <ul>
              <li>
                <Link to="/2019-04/appco-new/">New apps</Link>
              </li>
              <li>
                <Link to="/2019-04/appco-out/">Retired apps</Link>
              </li>
            </ul>
            <p>App Mining (March 2019)</p>
            <ul>
              <li>
                <Link to="/2019-03/appco-new/">New apps</Link>
              </li>
              <li>
                <Link to="/2019-03/appco-out/">Retired apps</Link>
              </li>
            </ul>
            <p>App Mining (February 2019)</p>
            <ul>
              <li>
                <Link to="/2019-02/appco-new/">New apps</Link>
              </li>
              <li>
                <Link to="/2019-02/appco-out/">Retired apps</Link>
              </li>
            </ul>
            <p>App Mining (January 2019)</p>
            <ul>
              <li>
                <Link to="/2019-01/appco-new/">New apps</Link>
              </li>
              <li>
                <Link to="/2019-01/appco-out/">Retired apps</Link>
              </li>
            </ul>
            <p>App Mining (December 2018)</p>
            <ul>
              <li>
                <Link to="/2018-12/appco-new/">New apps</Link>
              </li>            
            </ul>
            <a href="https://docs.blockstack.org/develop/mining_intro.html">
              Read more about the App Mining program
            </a>
          </div>
          <div
            style={{
              borderLeft: '#5DBCD2',
              borderLeftStyle: 'dashed',
              paddingLeft: '3rem',
            }}
          >
            <p>Your Apps</p>
            <ul>
              <li>
                <Link to="/app/">
                  <b>Manage apps</b>
                  <br />
                </Link>{' '}
                (requires login with Blockstack)
              </li>
              <li>
                <b>Manage comments</b>
                <br />
                (coming soon)
              </li>
              <li>
                <b>Manage rating</b>
                <br />
                (coming soon)
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
