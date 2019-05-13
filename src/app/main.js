import React from 'react'
import { encryptContent } from './services/auth'

class Main extends React.Component {

  state = {message:"My message", encryptedMessage:""}

  handleClick(event) {
    const encryptedMessage = encryptContent(this.state.message)
    this.setState({encryptedMessage})
  }
  handleChange(event) {
    this.setState({message: event.target.value});
  }

  render() {
    const {message, encryptedMessage} = this.state
    return (
      <>
        <h1>Your Main App</h1>
        <input type="text" value={message} onChange={event => this.handleChange(event)} />
        <button onClick={event => this.handleClick(event)}>Encrypt</button>
        {encryptedMessage}
        <hr />
      </>
    )
  }
}

export default Main
