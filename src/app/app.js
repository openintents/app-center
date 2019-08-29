import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/layout'
import NavBar from './components/NavBar'
import MyApps from './myapps'
import Main from './main'
import PrivateRoute from './components/PrivateRoute'
import Login from './login'
import MyComments from './mycomments';

const App = () => {
  return (
    <Layout>
      <NavBar />
      <Router>
        <PrivateRoute path="/data/apps" component={MyApps} />
        <PrivateRoute path="/data/reviews" component={MyComments} />
        <PublicRoute path="/data">
          <PrivateRoute path="/" component={Main} />
          <Login path="/login" />
        </PublicRoute>
      </Router>
    </Layout>
  )
}
function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default App
