import React from 'react'
import SessionPerPointDetails from './SessionPerPointDetails.js'

class SessionPerPoint extends React.Component {
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
        <h5>SessionID: {this.props.session.SessionID}</h5>
        <h6><a href="/" onClick={this.handleClick}>Details</a></h6>
        <hr />
        
        <SessionPerPointDetails
          session={this.props.session}
          keywords={this.props.session.Payment}
          show={this.state.showModal} onHide={() => this.setState({ showModal: false })}
        />

      </div>
    )
  }
}

export default SessionPerPoint