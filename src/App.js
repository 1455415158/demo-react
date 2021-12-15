import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Router from './router'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

