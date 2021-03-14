import React from 'react'
import SessionPerStationDetails from './SessionPerStationDetails.js'

class SessionPerStation extends React.Component {
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
        <h5>Point ID: {this.props.session.PointID}</h5>
        <h6><a href="/" onClick={this.handleClick}>Details</a></h6>
        <hr />
        
        <SessionPerStationDetails
          session={this.props.session}
          show={this.state.showModal} onHide={() => this.setState({ showModal: false })}
        />

      </div>
    )
  }
}

export default SessionPerStation