import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo } from '@/store/actions.js'
import Layout from '@/views/layout'
import Login from '@/views/login' 


class Router extends Component {
  render() {
    const { token, role, getUserInfo } = this.props;
    return (
      <HashRouter>
        <Switch>
          <Route exact path = '/login' component={Login} />
          <Route
            path='/'
            render={() => {
              if ( !token ) {
                return <Redirect to='/login' />
              } else {
                return <Layout/>
                // if ( role ) {
                //   return <Layout/>
                // } else {
                //   getUserInfo(token).then(() => <Layout />)
                // }
              } 
            }}
          ></Route>
        </Switch>
      </HashRouter>
    )
  }
}

export default  connect((state) => state.user, { getUserInfo })(Router)