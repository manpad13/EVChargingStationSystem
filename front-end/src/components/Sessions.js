import React from "react"
import SessionPerPoint from './SessionsPerPoint/SessionPerPoint'
import PerPointHeader from './SessionsPerPoint/PerPointHeader'
import SessionPerStation from './SessionsPerStation/SessionPerStation'
import PerStationHeader from './SessionsPerStation/PerStationHeader'
import SessionPerEV from './SessionsPerEV/SessionPerEV'
import PerEVHeader from './SessionsPerEV/PerEVHeader'
import SessionPerProvider from './SessionsPerProvider/SessionPerProvider'
import PerProviderHeader from './SessionsPerProvider/PerProviderHeader'

class Events extends React.Component {
  constructor() {
    super()
    this.state = {
      formSubmitted: false,
      loading: false,
      data: {},
      resultsBy: '',
      // form inputs
      searchBy: 'Point',
      ID: '',
      startDate: '',
      endDate: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit(e) {
    e.preventDefault()
    this.setState({ loading: true })
    
    let url = "/SessionsPer" + this.state.searchBy
        url += "/" + encodeURIComponent(e.target.ID.value)
        url += "/" + e.target.startDate.value.split('-').join('')
        url += "/" + e.target.endDate.value.split('-').join('')
    //console.log(url)

    fetch(url, {
      method: 'GET',
      headers: {
        "x-observatory-auth": this.props.token
      }
    })
    .then(response => {
      if (response.status === 401) {
        alert('Not authorized')
        throw new Error('Not Authorized')
      }
      else if (response.status === 402) {
        alert("data not found")
        this.setState({formSubmitted: false})
        throw new Error('Data not found')
      }
      return response.json()
    })
    .then(data => {
      console.log(data)
      this.setState(prevState => {
        return {
          data: data,
          formSubmitted: true,
          loading: false,
          resultsBy: prevState.searchBy
        }
      })
    })
    .catch(error => {
      console.log(error)
      this.setState({ loading: false })
    })
  }


  renderHeader() {
    switch (this.state.resultsBy) {
      case "Point": return <PerPointHeader key={this.state.data.Point} data={this.state.data} />
      case "Station": return <PerStationHeader key={this.state.data.StationID} data={this.state.data} />
      case "EV": return <PerEVHeader key={this.state.data.vehicleID} data={this.state.data} />
      case "Provider": return <PerProviderHeader key={this.state.data.SessionID} data={this.state.data} />
      default: console.log("error")
    }
  }


  renderSessions() {
    switch (this.state.resultsBy) {
      case "Point": return this.state.data.ChargingSessionsList.map(session => <SessionPerPoint key={session.SessionIndex} session={session} />)
      case "Station": return this.state.data.SessionsSummaryList.map(session => <SessionPerStation key={session.PointID} session={session} />)
      case "EV": return this.state.data.VehicleChargingSessionsList.map(session => <SessionPerEV key={session.SessionIndex} session={session} />)
      case "Provider": return this.state.data.map(session => <SessionPerProvider key={session.SessionID} session={session} />)
      default: console.log("error")
    }
  }


  render() {
    return (
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="jumbotron">

              <form id="form" onSubmit={this.handleSubmit}>

                <div className="form-group">
                  <label for="exampleFormControlSelect1">Search by</label>
                  <select name="searchBy" class="form-control" onChange={e => this.handleChange(e)} value={this.state.searchBy}>
                    <option>Point</option>
                    <option>Station</option>
                    <option>EV</option>
                    <option>Provider</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="search">Enter {this.state.searchBy} ID</label>
                  <input
                    name="ID"
                    type="text" required
                    className="form-control"
                    value={this.state.ID}
                    onChange={e => this.handleChange(e)}
                  /> 
                </div>

                <div className="form-group">
                  <label htmlFor="startDate">From</label>
                  <input
                    name="startDate"
                    type="date" required
                    className="form-control"
                    value={this.state.startDate}
                    onChange={e => this.handleChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">To</label>
                  <input
                    name="endDate"
                    type="date"required
                    className="form-control"
                    value={this.state.endDate}
                    onChange={e => this.handleChange(e)}
                  />
                </div>

                <div style={{ textAlign: "center" }}>
                  <button type="submit" className="btn btn-primary">
                    {this.state.loading ? <div><span className="spinner-border spinner-border-sm"></span> Searching...</div> : "Search "}
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>

        {this.state.formSubmitted && (
          <div className="jumbotron">
            <div id="content" style={{ marginBottom: "300px" }}>
              {this.renderHeader()}
              <br />
              {this.renderSessions()}
            </div>
          </div>
        )}

      </div>
    )
  }
}

export default Events
