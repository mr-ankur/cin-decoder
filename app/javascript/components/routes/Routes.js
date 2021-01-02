import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import CinDecoder from "../CinDecoder";
import SearchHistory from "../SearchHistory";
import Login from "../auth/Login";


export default class Routes extends Component {
    render() {
        return (
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <CinDecoder auth={this.props.auth} {...this.props} />
                )}
              />
              <Route
                exact
                path="/search_history"
                render={() => <SearchHistory />}
              />
              <Route
                exact
                path="/login"
                render={() => <Login {...this.props} />}
              />
            </Switch>
          </Router>
        );
    }
}
