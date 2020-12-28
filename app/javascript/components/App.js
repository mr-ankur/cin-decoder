import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import Routes from './routes/Routes'
const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes {...this.props}/>
      </Provider>
    );
  }
}

