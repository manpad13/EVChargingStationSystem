import React from 'react'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  

  handleLogin(e) {
    e.preventDefault()
    var details = {
      'username': e.target.username.value,
      'password': e.target.password.value
    }
    // console.log(details)

    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + "=" + encodedValue)
    }
    formBody = formBody.join("&")

    fetch("/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
    .then(response => {
      // console.log(response)
      if (response.status === 400) {
        alert('Invalid credentials')
        throw new Error('Invalid credentials')
      }
      return response.json()
    })
    .then(data => {
      //console.log(data)
      this.props.onLogin(data.token)
    })
    .catch(error => {
      console.log(error)
    })
  }


  handleLogout(e) {
    e.preventDefault()
    //console.log(this.props.token)

    fetch("/logout", {
      method: 'POST',
      headers: {
        "x-observatory-auth": this.props.token
      }
    })
    .then(response => {
      if (response.status === 200) {
        alert('Successfully logged out')
        this.props.onLogout()
      } else {
        throw new Error('Logout failed')
      }
    })
    .catch(error => {
      console.log(error)
    })

  }

  render() {
    return (
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="jumbotron">

              {!this.props.loggedIn && (
                <form id="login-form" onSubmit={this.handleLogin}>

                  <div className="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input
                      name="username"
                      type="text" required
                      className="form-control"
                      value={this.state.username}
                      id="username"
                      placeholder="Enter Username"
                      onChange={e => this.handleChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                      name="password"
                      type="password" required
                      className="form-control"
                      value={this.state.password}
                      id="userPassword"
                      placeholder="Enter Password"
                      onChange={e=>this.handleChange(e)}
                    />
                  </div>

                  <div style={{ textAlign: "center"}}>
                    <button type="submit" class="btn btn-primary">Login</button>
                  </div>

                </form>
              )}

              {this.props.loggedIn && (
                <form id="logout-form" onSubmit={this.handleLogout}>
                  <div style={{ textAlign: "center"}}>
                    <h5>You are logged in</h5>
                    <br />
                    <button type="submit" class="btn btn-primary">Logout</button>
                  </div>
                </form>              
              )}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login