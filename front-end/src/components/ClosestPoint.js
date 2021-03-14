import React from "react"

class ClosestPoint extends React.Component {
  constructor() {
    super()
    this.state = {
      formSubmitted: false,
      loading: false,
      smallestDistance: 0,
      closestPoint: {},
      // form inputs
      lat: '',
      long: ''
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
    this.setState({ formSubmitted: true})

    this.setState({ loading: true })

    let url = "/closest"

    console.log(url)

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        longitude: e.target.long.value,
        latitude: e.target.lat.value
      }),
      headers: {
        'content-type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        //console.log("Distance to closest point is " + data.smallestDistance + "km")
        console.log(data.closestPoint)
        this.setState({
          loading: false,
          formSubmitted: true,
          smallestDistance: data.smallestDistance,
          closestPoint: data.closestPoint
        })
      })
      .catch(error => {
        this.setState({loading: false})
        console.error('Error:', error)
      })

  }

  render() {
    return (
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="jumbotron">

              <form id="form" onSubmit={this.handleSubmit}>

                <div className="form-group">
                  <label htmlFor="search">Enter your Latitude</label>
                  <input
                    name="lat"
                    type="text" required
                    className="form-control"
                    value={this.state.lat}
                    onChange={e => this.handleChange(e)}
                  /> 
                </div>

                <div className="form-group">
                  <label htmlFor="startDate">Enter your Longtitude</label>
                  <input
                    name="long"
                    type="text" required
                    className="form-control"
                    value={this.state.lot}
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
              <h5>Closest point is: {this.state.closestPoint.pointID}</h5>
              <h5>Shortest Distance: {this.state.smallestDistance}</h5>
              <h5>Station ID: {this.state.closestPoint.stationID}</h5>
              <h5>Point operator: {this.state.closestPoint.operator}</h5>
            </div>
          </div>
        )}

      </div>
    )
  }
}

export default ClosestPoint

