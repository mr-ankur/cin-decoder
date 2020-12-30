import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import CinDecoder from "../CinDecoder";
import SearchHistory from "../SearchHistory";


export default class Routes extends Component {
    render() {
        return (
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <CinDecoder auth={this.props.auth} {...this.props} />}
              />
              <Route
                exact
                path="/search_history"
                render={() => <SearchHistory />}
              />
            </Switch>
          </Router>
        );
    }
}
