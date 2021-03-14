import React from 'react'

class NewSession extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pointID: '',
      vehicleID: '',
      Type: 'slow',
      //
      connected: false,
      connectionTime: '',
      disconnectionTime: '',
      completed: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.startSession = this.startSession.bind(this)
    this.endSession = this.endSession.bind(this)
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  startSession(e) {
    e.preventDefault()
    console.log("starting session")
    this.setState({connected: true, completed: false, connectionTime: Date.now()})
  }

  endSession(e) {
    e.preventDefault()
    console.log("session ended")
    this.setState({connected: false, completed: true, disconnectionTime: Date.now()})
    alert("session ended")
  }


  render() {
    return (
      <div className="container" style={{marginTop: "100px"}}>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="jumbotron">

              <form id="form" onSubmit={this.startSession}>

                <div className="form-group">
                  <label htmlFor="pointID">Enter Point ID</label>
                  <input
                    name="pointID"
                    type="text" required
                    className="form-control"
                    value={this.state.pointID}
                    onChange={e => this.handleChange(e)}
                  /> 
                </div>

                <div className="form-group">
                  <label htmlFor="vehicleID">Enter Vehicle ID</label>
                  <input
                    name="vehicleID"
                    type="text" required
                    className="form-control"
                    value={this.state.vehicleID}
                    onChange={e => this.handleChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label for="type">Session Type</label>
                  <select name="type" class="form-control" onChange={e => this.handleChange(e)} value={this.state.searchBy}>
                    <option>Slow</option>
                    <option>Medium</option>
                    <option>Fast</option>
                  </select>
                </div>

                <div style={{ textAlign: "center" }}>
                  <button type="submit" className="btn btn-primary" disabled={this.state.connected ? true : false}>Start Session</button><br/><br/>
                  <button type="button" className="btn btn-primary" disabled={this.state.connected ? false : true} onClick={this.endSession}>End Session</button><br/><br/>
                </div>

              </form>

            </div>
          </div>
        </div>

      </div>
    )
  }

}

export default NewSession
