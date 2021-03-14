import React from 'react'
import SessionPerEVDetails from './SessionPerEVDetails.js'

class SessionPerEV extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.setState({
      showModal: true
    })
  }

  render() {
    return (
      <div>
        <h5>Session ID: {this.props.session.SessionID}</h5>
        <h6><a href="/" onClick={this.handleClick}>Details</a></h6>
        <hr />
        
        <SessionPerEVDetails
          session={this.props.session}
          show={this.state.showModal} onHide={() => this.setState({ showModal: false })}
        />

      </div>
    )
  }
}

export default SessionPerEV