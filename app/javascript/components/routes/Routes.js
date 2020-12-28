import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import CinDecoder from "../CinDecoder";


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
              {/* <Route
                exact
                path="/users/sign_in"
                render={() => <div> Helllllllllo</div>}
              /> */}
            </Switch>
          </Router>
        );
    }
}
