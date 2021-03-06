import React from 'react'
import { navigate } from 'gatsby'
import { handleLogin } from './services/blockstack'
import {
  Typography,
  Link,
  Divider,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Container,
} from '@material-ui/core'
import BlockstackProfile from '../components/blockstackProfile'

class Login extends React.Component {
  componentDidMount() {
    const location = this.props
    if (
      location &&
      location.location &&
      !!location.location.search &&
      location.location.search.startsWith('?authResponse=')
    ) {
      navigate(`/data`)
    }
  }

  handleSubmit = () => handleLogin(user => navigate(`/data`))
  render() {
    return (
      <>
        <Card style={{ margin: 4 }}>
          <CardHeader title="Log in" />
          <CardContent>
            <Container>
              <Typography variant="h6">What is Blockstack?</Typography>
              <Typography variant="body2">
                Blockstack is a new approach to the internet that let you own
                your data and maintain your privacy, security and freedom. Find
                out more at{' '}
                <Link href="https://docs.blockstack.org/">
                  Blockstack's documentation
                </Link>
                .
              </Typography>
            </Container>
            <Divider light />
            <Container>
              <Typography variant="h6">
                Why not login with Facebook or Google? Or my email?
              </Typography>
              <Typography variant="body2">
                Most social media companies are providing you with a free
                account so that they can sell your information to the highest
                bidder. Blockstack is different. With Blockstack, YOU control
                your identity. Neither Blockstack nor the makers of Blockstack
                apps can take the id from you or have access to it.
              </Typography>
            </Container>
          </CardContent>
          <CardActions>
            <BlockstackProfile variant="blue" />
          </CardActions>
        </Card>
      </>
    )
  }
}

export default Login
