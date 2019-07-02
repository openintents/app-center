import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO
          title="OI App Center"
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
            <p>App Mining (June 2019)</p>
            <ul>
              <li>
                <Link to="/2019-06/appco-new/">New apps</Link>
              </li>
              <li>
                <Link to="/2019-06/appco-out/">Retired apps</Link>
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
            <p>
              <b>Personal Data</b>
              <br />
              (requires login with Blockstack)
            </p>
            <ul>
              <li>
                <Link to="/data/#comments">
                  <b>Manage your comments</b>
                </Link>{' '}
              </li>
              <li>
                <Link to="/data/#apps">
                  <b>Manage your apps</b>
                </Link>{' '}
                <br />
                (For app publishers only)
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
