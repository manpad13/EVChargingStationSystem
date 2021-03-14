import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <div className="navbar-brand">EV App</div>
          <div className="collapse navbar-collapse" id="navbarText">

            <ul className="navbar-nav mr-auto">

              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/sessions">Charging Sessions</Link>
              </li>

              {this.props.loggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/closest">Find closest Charging Point</Link>
                </li>
              )}
              
              {this.props.loggedIn && (
                <li className="nav-times">
                  <Link className="nav-link" to="newsession">Start a new session</Link>
                </li>
              )}

              <li className="nav-item" style={{marginLeft: 250}}>
                <Link className="nav-link" to="/login">{this.props.loggedIn ? "Log out" : "Log in"}</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>

            </ul>

          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
