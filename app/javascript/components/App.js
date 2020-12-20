import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import CinDecoder from './CinDecoder'
import configureStore from '../configureStore'
const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => <CinDecoder/>}  />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

