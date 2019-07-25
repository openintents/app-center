import React, { Component } from 'react'
import { navigate } from 'gatsby'

import {
  Typography,
  Card,
  CardContent,
  Container,
  Button,
  CardActions,
} from '@material-ui/core'
import { redirectToSignIn } from '../app/services/blockstack'
import { LayoutContext } from './layout'
import { BlockstackButton } from 'react-blockstack-button'

class LoggedOut extends Component {
  static contextType = LayoutContext

  render() {
    const { isSignedIn } = this.context
    if (isSignedIn) {
      return null
    } else {
      return (
        <Card style={{ margin: 4 }}>
          <CardContent>
            <Container align="center">
              <BlockstackButton
                variant="blue"
                onClick={() => redirectToSignIn()}
              />
            </Container>
            <Container>
              <Typography>
                <b>Blockstack</b> is a decentralized computing network for apps
                that #cantbeevil.
              </Typography>
            </Container>
          </CardContent>
          <CardActions>
            <Container>
              <Button
                size="small"
                color="primary"
                onClick={() => navigate('data/login')}
              >
                Learn more
              </Button>
            </Container>
          </CardActions>
        </Card>
      )
    }
  }
}

export default LoggedOut
