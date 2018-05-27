import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  NavLink,
  Redirect,
  Prompt
} from 'react-router-dom';
import './App.css';

const User = (params) => {
  return (<h1>Welcome User {params.username}</h1>);
}

const Comp = () => {
  return (<h1>Welcome to Component</h1>);
};

class App extends Component {
  state = {
    loggedIn: false,
  }

  loginHandle = () => {
    this.setState(prevState => ({
        loggedIn: !prevState.loggedIn
      })
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ul>
            <li>
              <NavLink to="/" exact activeStyle={{ color: 'green' }}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeStyle={{ color: 'green' }}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/component" activeStyle={{ color: 'green' }}>
                Component
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/john"
                activeStyle={{ color: 'green' }}
                exact
              >
                User John
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/user/peter"
                activeStyle={{ color: 'green' }}
              >
                User Peter
              </NavLink>
            </li>
          </ul>

          <Prompt 
            when={!this.state.loggedIn}
            message={(location) => {
              return location.pathname.startsWith('/user') ?
                'Please Login' :
                true
            }}
          />

          {!this.state.loggedIn ?
            <input
              type="button"
              onClick={this.loginHandle.bind(this)}
              value="LogIn"
            /> :
            null
          }

          {this.state.loggedIn ?
            <input
              type="button"
              onClick={this.loginHandle.bind(this)}
              value="Logout"
            /> :
            null
          }

          <Route path="/" exact strict render={() => {
            return (<h1>Welcome Home</h1>)
          }}
          />
          <Route path="/about" exact strict render={() => {
            return (<h1>Welcome About</h1>)
          }}
          />
          <Route
            path="/component"
            exact
            strict
            component={Comp}
          />
          <Route
            path="/user/:username"
            exact
            strict
            render={({match}) => (
              this.state.loggedIn ?
              (<User username={match.params.username} />) :
              (<Redirect to='/' />)
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
