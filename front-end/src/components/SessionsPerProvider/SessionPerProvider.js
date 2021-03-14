import React from 'react'
import SessionPerProviderDetails from './SessionPerProviderDetails.js'

class SessionPerProvider extends React.Component {
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
        <h5>Station ID: {this.props.session.StationID}</h5>
        <h6><a href="/" onClick={this.handleClick}>Details</a></h6>
        <hr />
        
        <SessionPerProviderDetails
          session={this.props.session}
          keywords={this.props.session.Payment}
          show={this.state.showModal} onHide={() => this.setState({ showModal: false })}
        />

      </div>
    )
  }
}

export default SessionPerProvider