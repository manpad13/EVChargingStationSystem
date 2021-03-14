import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sessions from './components/Sessions'
import About from './components/About'
import Login from './components/Login'
import ClosestPoint from './components/ClosestPoint'
import NewSession from './components/NewSession'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      token: ''
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar loggedIn={this.state.loggedIn} />
          <Route exact path="/sessions"
            render={() =><Sessions token={this.state.token}/>}
          />

          <Route exact path="/about" component={About} />

          <Route
            exact path="/login"
            render={() =>
              <Login
                loggedIn={this.state.loggedIn}
                token={this.state.token}
                onLogin={(tok) => {
                  //console.log("user token is", tok);
                  this.setState({loggedIn: true, token: tok});
                }}
                onLogout={() => {
                  //console.log("logging out")
                  this.setState({loggedIn: false, token: ''});
                }}
              />
            }
          />

          {this.state.loggedIn && (
            <div>
              <Route exact path="/closest" component={ClosestPoint} />
              <Route exact path="/newsession" component={NewSession} />
            </div>
          )}


        </div>
      </BrowserRouter>
    )
  }
}

export default App;
